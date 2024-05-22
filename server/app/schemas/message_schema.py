# app/schemas/message_schema.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MessageData(BaseModel):
    sender_id: str
    content: str
    sent_at: Optional[datetime] = None

class MessageResponse(BaseModel):
    message_id: str
    sender_id: str
    content: str
    sent_at: datetime
