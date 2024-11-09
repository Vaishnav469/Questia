import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://Questia_db_owner:fhKUbL9DP4zT@ep-fragrant-voice-a1xahniy.ap-southeast-1.aws.neon.tech/Questia_db?sslmode=require"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY ="rander" # os.getenv('JWT_SECRET_KEY', 'your_jwt_secret_key')
