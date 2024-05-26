from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel
from typing import List
from datetime import datetime
from ..schemas.room_schema import RoomData, MessageData 
from app.database.database import db
from firebase_admin import firestore


router = APIRouter(
    prefix="/rooms",
    tags=["Rooms"],
)

@router.post("/create-room")
async def create_room(room_data: RoomData = Body(...)):
    room_ref = db.collection("rooms").add({"room_name": room_data.room_name})
    return {"room_id": room_ref[1].id, "room_name": room_data.room_name}

@router.get("/list-rooms")
async def list_rooms():
    rooms = db.collection("rooms").stream()
    return [{"room_id": room.id, **room.to_dict()} for room in rooms]

@router.post("/send-message/{room_id}")
async def send_message(room_id: str, message_data: MessageData = Body(...)):
    message_ref = db.collection("rooms").document(room_id).collection("messages").add({
        "sender_id": message_data.sender_id,
        "content": message_data.content,
        "sent_at": firestore.SERVER_TIMESTAMP
    })
    return {"message_id": message_ref[1].id, **message_data.dict()}

@router.get("/room-messages/{room_id}")
async def get_room_messages(room_id: str):
    messages = db.collection("rooms").document(room_id).collection("messages").order_by("sent_at").stream()
    return [{"message_id": msg.id, **msg.to_dict()} for msg in messages]

@router.delete("/delete-room/{room_id}")
async def delete_room(room_id: str):
    room_ref = db.collection("rooms").document(room_id)
    messages_ref = room_ref.collection("messages")

    messages = messages_ref.stream()
    for message in messages:
        message.reference.delete()

    room_ref.delete()

    return {"message": "Room and all associated messages have been deleted successfully"}
