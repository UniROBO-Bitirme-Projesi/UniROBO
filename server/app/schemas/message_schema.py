from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class MessageData(BaseModel):
    content: str = Field(..., description="Mesajın içeriği.")

class MessageResponse(BaseModel):
    message_id: str = Field(..., description="Mesajın benzersiz kimliği.")
    sender_id: str = Field(..., description="Mesajı gönderen kullanıcının kimliği.")
    content: str = Field(..., description="Mesajın içeriği.")
    sent_at: Optional[datetime] = Field(None, description="Mesajın gönderilme zamanı.")
