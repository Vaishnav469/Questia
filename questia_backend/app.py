from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config


db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize db, migrate, and jwt
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    # Register the API blueprint
    from routes import api
    from teachers_bot import quiz_bot

    app.register_blueprint(api, url_prefix='/api')
    app.register_blueprint(quiz_bot,url_prefix='/quiz_bot')
    

    return app
