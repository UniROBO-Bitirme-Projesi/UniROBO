# websocket_manager.py
import asyncio
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, set] = {}

    async def connect(self, websocket, room_id):
        if room_id not in self.active_connections:
            self.active_connections[room_id] = set()
        self.active_connections[room_id].add(websocket)
        logger.info(f"Connected: {websocket.client} to room {room_id}")

    async def disconnect(self, websocket, room_id):
        if room_id in self.active_connections:
            self.active_connections[room_id].remove(websocket)
            if not self.active_connections[room_id]:
                del self.active_connections[room_id]
            logger.info(f"Disconnected: {websocket.client} from room {room_id}")

    async def broadcast(self, room_id: str, message: dict):
        if room_id in self.active_connections:
            for connection in self.active_connections[room_id]:
                await connection.send_json(message)
            logger.info(f"Broadcasted in {room_id}: {message}")

manager = ConnectionManager()
