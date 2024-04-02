from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class SignUpData(BaseModel):
    email: EmailStr = Field(..., description="Kayıt için kullanılacak e-mail adresi.")
    password: str = Field(..., description="Kullanıcının oluşturacağı şifre.")
    display_name: Optional[str] = Field(None, description="Kullanıcının görünen adı.")

class SignInData(BaseModel):
    email: EmailStr = Field(..., description="Giriş için kullanılacak e-mail adresi.")
    password: str = Field(..., description="Giriş için kullanılacak şifre.")

class UserResponse(BaseModel):
    email: EmailStr
    display_name: Optional[str] = None
    photo_url: Optional[str] = None
    email_verified: bool
    uid: str
    phone_number: Optional[str] = None
    last_sign_in_time: Optional[int] = None
    creation_time: Optional[int] = None
