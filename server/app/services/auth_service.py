import firebase_admin
from firebase_admin import credentials, auth

# Firebase Admin SDK başlatılıyor.
cred = credentials.Certificate("path/to/firebase_key.json")
firebase_admin.initialize_app(cred)

def create_user(email, password):
    user_record = auth.create_user(email=email, password=password)
    return user_record.uid

def verify_id_token(id_token):
    decoded_token = auth.verify_id_token(id_token)
    return decoded_token['uid']
