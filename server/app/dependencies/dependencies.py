from fastapi import Header, HTTPException, Depends
from firebase_admin import auth

def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    id_token = authorization.split(" ")[1]
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token['uid']
        return auth.get_user(uid)
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
