from fastapi import APIRouter, HTTPException, Body, Depends, Header 
from ..schemas.user_schema import SignUpData, SignInData, UserResponse 
from ..dependencies.dependencies import get_current_user
from ..services import auth_service
from firebase_admin import auth

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"], 
)


@router.post("/signup", response_model=UserResponse)
async def sign_up(sign_up_data: SignUpData = Body(...)): 
    try:
        user_info = auth_service.create_user(sign_up_data)
        return {
            "email": user_info.email,
            "display_name": user_info.display_name,
            "photo_url": user_info.photo_url,
            "email_verified": user_info.email_verified,
            "uid": user_info.uid
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



@router.post("/signin", response_model=UserResponse)
async def sign_in(sign_in_data: SignInData = Body(...)):
    try:
        user = auth_service.sign_in_with_email_and_password(sign_in_data.email, sign_in_data.password)
        return {
            "email": user.email,
            "display_name": user.display_name,
            "photo_url": user.photo_url,
            "email_verified": user.email_verified,
            "uid": user.uid 
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/user-info/{user_id}", response_model=UserResponse)
async def get_user_info_by_id(user_id: str):
    try:
        user = auth.get_user(user_id)
        return {
            "email": user.email,
            "display_name": user.display_name,
            "photo_url": user.photo_url,
            "email_verified": user.email_verified,
            "uid": user.uid,
            "phone_number": user.phone_number,
            "last_sign_in_time": user.user_metadata.last_sign_in_timestamp,
            "creation_time": user.user_metadata.creation_timestamp
        }
    except auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    