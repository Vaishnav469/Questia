from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize db and migrate
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Import routes after the app is initialized
    from routes import api
    app.register_blueprint(api)

    return app
