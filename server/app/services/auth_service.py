import firebase_admin
from firebase_admin import credentials, auth
from ..schemas.user_schema import SignUpData

# Firebase Admin SDK başlatılıyor.
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)

def create_user(sign_up_data: SignUpData):
    user_record = auth.create_user(
        email=sign_up_data.email,
        password=sign_up_data.password,
        display_name=sign_up_data.display_name
    )
    user_info = auth.get_user(user_record.uid)
    return user_info


def verify_id_token(id_token):
    decoded_token = auth.verify_id_token(id_token)
    return decoded_token['uid']


def get_user_info(uid):
    user_record = auth.get_user(uid)
    return {
        "email": user_record.email,
        "display_name": user_record.display_name,
        "photo_url": user_record.photo_url,
        "email_verified": user_record.email_verified,
        "uid": user_record.uid,
        "phone_number": user_record.phone_number,
        "last_sign_in_time": user_record.user_metadata.last_sign_in_timestamp,
        "creation_time": user_record.user_metadata.creation_timestamp
    }

def sign_in_with_email_and_password(email: str, password: str):
    try:
        user = auth.get_user_by_email(email)
        return user
    except auth.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))