import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://questia_owner:tfSbTFnmK8e4@ep-white-mud-a5t5vpbq.us-east-2.aws.neon.tech/questia?sslmode=require"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY ="Rk1IU0NKbFJXa2hpRzJ0NUNZYVlNOUU4a2hxR3A4dzY="
