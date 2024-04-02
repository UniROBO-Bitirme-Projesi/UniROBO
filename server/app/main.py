from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordRequestForm
from .routers import auth, rooms, message

app = FastAPI()

app.include_router(auth.router, prefix="/api/v1")
app.include_router(rooms.router, prefix="/api/v1")
app.include_router(message.router, prefix="/api/v1")
