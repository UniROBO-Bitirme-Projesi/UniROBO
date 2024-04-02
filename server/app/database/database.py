import firebase_admin
from firebase_admin import credentials, firestore

# Firebase Admin SDK başlatılıyor.
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)

# Firestore istemcisini tanımla
db = firestore.client()
