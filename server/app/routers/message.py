from fastapi import APIRouter, Body, HTTPException, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List
from datetime import datetime
from google.cloud import firestore
from ..schemas.message_schema import MessageResponse, MessageData
from app.database.database import db
import openai
import asyncio

router = APIRouter(
    prefix="/messages",
    tags=["Messages"],
)

# OpenAI API Key
openai.api_key = "sk-proj-G9fGsSKh5w5VDUXk6Nw2T3BlbkFJMY7pYGOTpmqV3fsDsd6V"

connected_clients = {}

class WebSocketConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, List[WebSocket]] = {}

    async def connect(self, room_id: str, websocket: WebSocket):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        self.active_connections[room_id].append(websocket)

    def disconnect(self, room_id: str, websocket: WebSocket):
        self.active_connections[room_id].remove(websocket)
        if not self.active_connections[room_id]:
            del self.active_connections[room_id]

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, room_id: str, message: str):
        for connection in self.active_connections.get(room_id, []):
            await connection.send_text(message)

manager = WebSocketConnectionManager()

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(room_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(room_id, data)
    except WebSocketDisconnect:
        manager.disconnect(room_id, websocket)

@router.get("/room-messages/{room_id}", response_model=List[MessageResponse])
async def get_room_messages(room_id: str):
    messages_ref = db.collection("rooms").document(room_id).collection("messages").order_by("sent_at").stream()
    messages = [{"message_id": msg.id, **msg.to_dict()} for msg in messages_ref]
    return messages

@router.post("/send-message/{room_id}", response_model=MessageResponse)
async def send_message(room_id: str, message_data: MessageData = Body(...)):
    message_ref = db.collection("rooms").document(room_id).collection("messages").add({
        "sender_id": message_data.sender_id,
        "content": message_data.content,
        "sent_at": firestore.SERVER_TIMESTAMP
    })
    
    # Broadcast the message to all connected clients in the room
    message_id = message_ref[1].id
    new_message = {"message_id": message_id, **message_data.dict()}
    await manager.broadcast(room_id, new_message)

    # If the sender is not ChatGPT, generate a response
    if message_data.sender_id != "ChatGPT":
        response = await get_chatgpt_response(message_data.content)
        chatgpt_message_data = MessageData(sender_id="ChatGPT", content=response)
        await send_message(room_id, chatgpt_message_data)

    return new_message

async def get_chatgpt_response(message: str) -> str:
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=message,
        max_tokens=150
    )
    return response.choices[0].text.strip()
