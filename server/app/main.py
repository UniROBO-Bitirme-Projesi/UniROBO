# main.py
from fastapi import FastAPI
from socketio import AsyncServer, ASGIApp
from routers import auth, rooms, message

sio = AsyncServer(async_mode='asgi', cors_allowed_origins='*')

app = FastAPI()

socket_app = ASGIApp(sio, app)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(rooms.router, prefix="/api/v1")
app.include_router(message.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"Hello": "World"}

@sio.event
async def connect(sid, environ):
    print('connect ', sid)

@sio.event
async def chat_message(sid, data):
    print('message ', data)
    await sio.emit('reply', room=sid, data=f"Echo: {data}")

@sio.event
async def disconnect(sid):
    print('disconnect ', sid)


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(socket_app, host="0.0.0.0", port=8000)
