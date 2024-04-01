from fastapi import APIRouter, Depends, HTTPException
from ..services import auth_service

router = APIRouter()

@router.post("/signup")
async def sign_up(email: str, password: str):
    try:
        user_id = auth_service.create_user(email, password)
        return {"user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/signin")
async def sign_in(id_token: str):
    try:
        user_id = auth_service.verify_id_token(id_token)
        return {"user_id": user_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
