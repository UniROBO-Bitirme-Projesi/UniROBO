from fastapi import APIRouter, Body, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
from datetime import datetime
from google.cloud import firestore
import openai
import asyncio
from starlette.responses import StreamingResponse
from app.database.database import db
from ..schemas.message_schema import MessageResponse, MessageData
from ..models.message_models import SendMessageRequest
import logging

# Logger'ı tanımla
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

router = APIRouter(
    prefix="/messages",
    tags=["Messages"],
)

openai.api_key = "sk-proj-G9fGsSKh5w5VDUXk6Nw2T3BlbkFJMY7pYGOTpmqV3fsDsd6V"

class MessageConnectionManager:
    def __init__(self):
        self.active_rooms: dict[str, asyncio.Queue] = {}

    async def connect(self, sid, room_id):
        if room_id not in self.active_rooms:
            self.active_rooms[room_id] = asyncio.Queue()
        await self.active_rooms[room_id].put(sid)
        logger.info(f"Connected: {sid} to room {room_id}")

    async def disconnect(self, sid, room_id):
        if room_id in self.active_rooms:
            await self.active_rooms[room_id].put(None)
            del self.active_rooms[room_id]
            logger.info(f"Disconnected: {sid} from room {room_id}")

    async def broadcast(self, room_id: str, message: dict):
        if room_id in self.active_rooms:
            await self.active_rooms[room_id].put(message)
            logger.info(f"Broadcasted in {room_id}: {message}")

manager = MessageConnectionManager()

@router.get("/room-messages/{room_id}", response_model=List[MessageResponse])
async def get_room_messages(room_id: str):
    messages_ref = db.collection("rooms").document(room_id).collection("messages").order_by("sent_at").stream()
    messages = [{"message_id": msg.id, **msg.to_dict()} for msg in messages_ref]
    return messages

async def save_message_to_db(room_id: str, message_data: MessageData):
    message_ref = db.collection("rooms").document(room_id).collection("messages").add({
        "sender_id": message_data.sender_id,
        "content": message_data.content,
        "sent_at": firestore.SERVER_TIMESTAMP
    })
    message_id = message_ref[1].id
    return message_id

async def send_message(room_id: str, message_data: MessageData, from_chatgpt=False):
    message_id = await save_message_to_db(room_id, message_data)
    new_message = {"message_id": message_id, **message_data.dict()}
    await manager.broadcast(room_id, new_message)
    logger.info(f"Mesaj gönderildi: {new_message}")  # Log mesajı

    if not from_chatgpt and message_data.sender_id != "ChatGPT":
        logger.info("ChatGPT'den yanıt alınıyor...")
        await stream_chatgpt_response(room_id, message_data.content)

    return new_message

async def get_chatgpt_response_stream(prompt: str):
    try:
        client = openai.AsyncOpenAI(api_key="sk-proj-G9fGsSKh5w5VDUXk6Nw2T3BlbkFJMY7pYGOTpmqV3fsDsd6V")
        stream = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            stream=True
        )
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content
    except Exception as e:
        logger.error(f"ChatGPT response error: {e}")
        yield "Üzgünüm, bir hata oluştu ve yanıt veremiyorum."

async def stream_chatgpt_response(room_id: str, prompt: str):
    logger.info(f"ChatGPT'den yanıt isteniyor, soru: {prompt}")
    full_response = ""
    async for message_part in get_chatgpt_response_stream(prompt):
        full_response += message_part
    
    chatgpt_message_data = MessageData(sender_id="ChatGPT", content=full_response)
    await send_message(room_id, chatgpt_message_data, from_chatgpt=True)

@router.post("/send-message/{room_id}")
async def send_message_endpoint(room_id: str, message_data: SendMessageRequest):
    try:
        message = MessageData(sender_id=message_data.sender_id, content=message_data.content)
        return await send_message(room_id, message)
    except Exception as e:
        logger.error(f"Error sending message: {e}")
        return JSONResponse(status_code=500, content={"message": "Error sending message"})

@router.get("/stream/{room_id}")
async def stream_messages(request: Request, room_id: str):
    async def event_generator():
        queue = manager.active_rooms.get(room_id)
        if queue is None:
            return

        try:
            while True:
                message = await queue.get()
                if message is None:
                    break
                yield f"data: {message}\n\n"
                if await request.is_disconnected():
                    break

        except asyncio.CancelledError:
            pass
        finally:
            if room_id in manager.active_rooms:
                del manager.active_rooms[room_id]

    return StreamingResponse(event_generator(), media_type="text/event-stream")
