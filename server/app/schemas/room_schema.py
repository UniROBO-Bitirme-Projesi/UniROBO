from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class RoomData(BaseModel):
    room_name: str = Field(..., description="Sohbet odasının adı.")

class ChatRoomResponse(BaseModel):
    room_id: str = Field(..., description="Sohbet odasının benzersiz kimliği.")
    room_name: str = Field(..., description="Sohbet odasının adı.")
    created_at: Optional[datetime] = Field(None, description="Sohbet odasının oluşturulma zamanı.")
