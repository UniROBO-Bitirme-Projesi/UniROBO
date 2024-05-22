# app/models/message_models.py

from pydantic import BaseModel

class SendMessageRequest(BaseModel):
    sender_id: str
    content: str
