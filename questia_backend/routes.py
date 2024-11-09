from flask import Blueprint, request, jsonify
from app import db
from models import Teacher, Student
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token,jwt_required
from datetime import timedelta
from cryptography.fernet import Fernet

api = Blueprint('api', __name__)

SECRET_KEY = b'Rk1IU0NKbFJXa2hpRzJ0NUNZYVlNOUU4a2hxR3A4dzY='
cipher = Fernet(SECRET_KEY)

def decrypt_password(encrypted_password):
    decrypted_password = cipher.decrypt(encrypted_password.encode())
    return decrypted_password.decode('utf-8')

# Signup API
@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    email = data.get('email')
    encrypted_password = data.get('password')  # Encrypted password from frontend
    role = data.get('role')  # 'teacher' or 'student'

    if not email or not encrypted_password or not role:
        return jsonify({'msg': 'Missing required fields'}), 400
    
    # Decrypt the password
    try:
        password = decrypt_password(encrypted_password)
    except Exception as e:
        return jsonify({'msg': 'Failed to decrypt password'}), 400

    
    # Check if user already exists
    if role == 'teacher':
        existing_user = Teacher.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'msg': 'Teacher already exists'}), 400
        new_user = Teacher(email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        
    elif role == 'student':
        existing_user = Student.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'msg': 'Student already exists'}), 400
        new_user = Student(email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        
    else:
        return jsonify({'msg': 'Invalid role'}), 400

    # Generate JWT token with the role
    access_token = create_access_token(identity=email, additional_claims={"role": role}, expires_delta=timedelta(days=1))

    return jsonify({
        'msg': 'User created successfully'
       # 'access_token': access_token
    }), 201


# Login API
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    email = data.get('email')
    encrypted_password = data.get('password')  # Encrypted password from frontend

    if not email or not encrypted_password:
        return jsonify({'msg': 'Missing email or password'}), 400

    # Decrypt the password
    try:
        password = decrypt_password(encrypted_password)
    except Exception as e:
        return jsonify({'msg': 'Failed to decrypt password'}), 400

    user = Teacher.query.filter_by(email=email).first() or Student.query.filter_by(email=email).first()
    
    if user and user.check_password(password):
        # Generate JWT token
        role = 'teacher' if isinstance(user, Teacher) else 'student'
        access_token = create_access_token(identity=email, additional_claims={"role": role}, expires_delta=timedelta(days=1))
        
        return jsonify({
            'msg': 'Login successful',
            'access_token': access_token
        }), 200
    else:
        return jsonify({'msg': 'Invalid credentials'}), 401


@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="This is a protected route")
