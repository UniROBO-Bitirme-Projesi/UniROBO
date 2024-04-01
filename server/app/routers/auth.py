from fastapi import APIRouter

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.post("/signup")
async def sign_up():
    return {"message": "Sign up endpoint"}

@router.post("/signin")
async def sign_in():
    return {"message": "Sign in endpoint"}
