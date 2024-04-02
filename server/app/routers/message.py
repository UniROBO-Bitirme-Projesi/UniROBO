from fastapi import APIRouter, HTTPException, Body, Depends, Header 
from ..schemas.room_schema import ChatRoomResponse, RoomData
from ..schemas.message_schema import MessageResponse, MessageData
from pydantic import BaseModel, Field
from typing import  List
from datetime import datetime

router = APIRouter(
    prefix="/messages",
    tags=["Messages"],
)

@router.get("/room-messages/{room_id}", response_model=List[MessageResponse])
async def get_room_messages(room_id: str):
    # Dummy veri döndür
    return [
        {
            "message_id": "dummy_message_id_1",
            "sender_id": "dummy_user_id_1",
            "content": "Hello!",
            "sent_at": "2024-04-01T12:10:00Z"
        },
        {
            "message_id": "dummy_message_id_2",
            "sender_id": "dummy_user_id_2",
            "content": "Hi there!",
            "sent_at": "2024-04-01T12:11:00Z"
        }
    ]


@router.post("/send-message/{room_id}", response_model=MessageResponse)
async def send_message(room_id: str, message_data: MessageData = Body(...)):
    # Dummy veri döndür
    return {
        "message_id": "dummy_message_id",
        "sender_id": "dummy_user_id",
        "content": message_data.content,
        "sent_at": "2024-04-01T12:15:00Z"
    }
