from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime
from ..schemas.message_schema import MessageResponse, MessageData
from app.database.database import db


router = APIRouter(
    prefix="/messages",
    tags=["Messages"],
)



@router.get("/room-messages/{room_id}", response_model=List[MessageResponse])
async def get_room_messages(room_id: str):
    messages_ref = db.collection("rooms").document(room_id).collection("messages").order_by("sent_at").stream()
    messages = [{"message_id": msg.id, **msg.to_dict()} for msg in messages_ref]
    return messages



# Burada kullanıcı tarafından gelecek mesajlar için ai cevap verecek 
@router.post("/send-message/{room_id}", response_model=MessageResponse)
async def send_message(room_id: str, message_data: MessageData = Body(...)):
    message_ref = db.collection("rooms").document(room_id).collection("messages").add({
        "sender_id": message_data.sender_id,
        "content": message_data.content,
        "sent_at": firestore.SERVER_TIMESTAMP
    })
    return {"message_id": message_ref[1].id, **message_data.dict()}
