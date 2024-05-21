from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime
from google.cloud import firestore
import socketio
from ..schemas.message_schema import MessageResponse, MessageData
from app.database.database import db
import openai

router = APIRouter(
    prefix="/messages",
    tags=["Messages"],
)

# OpenAI API Key
openai.api_key = "sk-proj-G9fGsSKh5w5VDUXk6Nw2T3BlbkFJMY7pYGOTpmqV3fsDsd6V"

class MessageConnectionManager:
    def __init__(self):
        self.active_rooms: dict[str, List[str]] = {}

    async def connect(self, sid, room_id):
        await sio.save_session(sid, {'room_id': room_id})
        sio.enter_room(sid, room_id)
        if room_id not in self.active_rooms:
            self.active_rooms[room_id] = []
        self.active_rooms[room_id].append(sid)

    async def disconnect(self, sid):
        session = await sio.get_session(sid)
        room_id = session.get('room_id')
        sio.leave_room(sid, room_id)
        self.active_rooms[room_id].remove(sid)
        if not self.active_rooms[room_id]:
            del self.active_rooms[room_id]

    async def broadcast(self, room_id: str, message: str):
        await sio.emit('message', message, room=room_id)

manager = MessageConnectionManager()

@sio.event
async def connect(sid, environ, auth):
    room_id = auth.get('room_id')
    await manager.connect(sid, room_id)
    await sio.emit('status', {'message': 'Connected'}, room=sid)

@sio.event
async def chat_message(sid, data):
    room_id = await sio.get_session(sid)['room_id']
    await manager.broadcast(room_id, data)

@sio.event
async def disconnect(sid):
    await manager.disconnect(sid)

@router.get("/room-messages/{room_id}", response_model=List[MessageResponse])
async def get_room_messages(room_id: str):
    messages_ref = db.collection("rooms").document(room_id).collection("messages").order_by("sent_at").stream()
    messages = [{"message_id": msg.id, **msg.to_dict()} for msg in messages_ref]
    return messages

@router.post("/send-message/{room_id}", response_model=MessageResponse)
async def send_message(room_id: str, message_data: MessageData = Body(...), from_chatgpt=False):
    message_ref = db.collection("rooms").document(room_id).collection("messages").add({
        "sender_id": message_data.sender_id,
        "content": message_data.content,
        "sent_at": firestore.SERVER_TIMESTAMP
    })
    message_id = message_ref[1].id
    new_message = {"message_id": message_id, **message_data.dict()}
    await manager.broadcast(room_id, new_message)

    # Only generate a response if the message is not from ChatGPT
    if not from_chatgpt and message_data.sender_id != "ChatGPT":
        response = await get_chatgpt_response(message_data.content)
        chatgpt_message_data = MessageData(sender_id="ChatGPT", content=response)
        await send_message(room_id, chatgpt_message_data, from_chatgpt=True)

    return new_message


async def get_chatgpt_response(message: str) -> str:
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=message,
        max_tokens=150
    )
    return response.choices[0].text.strip()
