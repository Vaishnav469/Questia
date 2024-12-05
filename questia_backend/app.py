from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token
from config import Config
from flask_cors import CORS
from datetime import timedelta
import os


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

JWT_KEY = os.environ.get('JWT_KEY')

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    app.config["JWT_SECRET_KEY"] =  JWT_KEY
    
    # Initialize db, migrate, and jwt
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    from routes import register_routes 
    register_routes(app)

    from teachers_bot import quiz_bot 
    app.register_blueprint(quiz_bot, url_prefix='/quiz')

    return app
    
if __name__ == '__main__': 
    app = create_app() 
    app.run(debug=True)