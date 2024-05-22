from fastapi import FastAPI
from .routers import auth, rooms, message

app = FastAPI()

app.include_router(auth.router, prefix="/api/v1")
app.include_router(rooms.router, prefix="/api/v1")
app.include_router(message.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"Hello": "World"}
