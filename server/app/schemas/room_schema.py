from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class RoomData(BaseModel):
    room_name: str

class MessageData(BaseModel):
    sender_id: str
    content: str

class MessageResponse(BaseModel):
    message_id: str
    sender_id: str
    content: str
    sent_at: datetime
    
    
class ChatRoomResponse(BaseModel):
    room_id: str
    room_name: str
    created_at: datetime