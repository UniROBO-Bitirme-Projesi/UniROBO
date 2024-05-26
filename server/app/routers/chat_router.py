# chat_router.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from ..manager.websocket_manager import manager
from ..database.database import db
from ..schemas.message_schema import MessageData, MessageResponse
from ..models.message_models import SendMessageRequest
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await manager.connect(websocket, room_id)
    try:
        while True:
            data = await websocket.receive_json()
            message_data = MessageData(**data)
            await save_message_to_db(room_id, message_data)
            await manager.broadcast(room_id, data)
    except WebSocketDisconnect:
        await manager.disconnect(websocket, room_id)
    except Exception as e:
        logger.error(f"WebSocket error: {e}")

async def save_message_to_db(room_id: str, message_data: MessageData):
    await db.collection("rooms").document(room_id).collection("messages").add({
        "sender_id": message_data.sender_id,
        "content": message_data.content,
        "sent_at": firestore.SERVER_TIMESTAMP
    })
