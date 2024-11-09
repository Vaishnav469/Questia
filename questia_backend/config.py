import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_DATABASE_URI = "postgresql://Questia_db_owner:fhKUbL9DP4zT@ep-fragrant-voice-a1xahniy.ap-southeast-1.aws.neon.tech/Questia_db?sslmode=require"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
