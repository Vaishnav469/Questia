from flask import Blueprint, request, jsonify
from app import db
from models import Teacher, Student,  TeacherProfile, ChildProfile, Classroom, Form, FormAnswer
from datetime import timedelta
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


# Signup API
@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  # 'teacher' or 'student'

    if not email or not password or not role:
        return jsonify({'msg': 'Missing required fields'}), 400
    
    hashed_password = generate_password_hash(password)

    # Check if user already exists
    if role == 'teacher':
        existing_user = Teacher.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'msg': 'Teacher already exists'}), 400
        new_user = Teacher(email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()

        profile = TeacherProfile(uid=new_user.id, email=new_user.email)
        db.session.add(profile)
        
    elif role == 'student':
        existing_user = Student.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'msg': 'Student already exists'}), 400
        new_user = Student(email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        
        profile = ChildProfile(uid=new_user.id, email=new_user.email)
        db.session.add(profile)
    else:
        return jsonify({'msg': 'Invalid role'}), 400
    
    db.session.commit()
    return jsonify({
        'msg': 'User created successfully'
    }), 201


# Login API
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'msg': 'Missing email or password'}), 400

    user = Teacher.query.filter_by(email=email).first() or Student.query.filter_by(email=email).first()
   
    
    if user and check_password_hash(user.password_hash, password):
        # Generate JWT token
        role = 'teacher' if isinstance(user, Teacher) else 'student'
        access_token = create_access_token(identity=email, additional_claims={"role": role, "uid": user.id}, expires_delta=timedelta(days=1))
        
        return jsonify({
            'msg': 'Login successful',
            'access_token': access_token
        }), 200
    else:
        return jsonify({'msg': 'Invalid credentials'}), 401



@api.route('/protected', methods=['GET'])
def protected():
    return jsonify(message="This is a protected route")

@api.route('/createclassroom', methods=['POST'])
def create_classroom():
    data = request.get_json()
    title = data.get('title')
    desciption = data.get('description')
    unique_code = data.get('unique_code')
    teacher_id = data.get('uid')
    
    classroom = Classroom(title=title, desciption=desciption, unique_code=unique_code, teacher_uid=teacher_id)
    db.session.add(classroom)
    
    # Update teacher's classrooms_created array
    teacher_profile = TeacherProfile.query.get(teacher_id)
    teacher_profile.classrooms_created.append(classroom.uid)
    db.session.commit()
    
    return jsonify({'msg': 'Classroom created', 'classroom_id': classroom.uid})


@api.route('/teacher_classrooms', methods=['GET'])
def view_teacher_classrooms():

    teacher_uid = request.args.get('teacher_uid')
    
    classrooms = Classroom.query.filter_by(teacher_uid=teacher_uid).all()
    return jsonify([{'uid': classroom.uid, 'title': classroom.title, 'unique_code': classroom.unique_code} for classroom in classrooms]), 200


@api.route('/classroom_join', methods=['POST'])
def join_classroom():
    data = request.get_json()
    code = data.get('code')
    student_uid = data.get('student_uid')
    
    classroom = Classroom.query.filter_by(unique_code=code).first()
    if not classroom:
        return jsonify({'msg': 'Classroom not found'}), 404
    
    # Add classroom to student’s profile
    classroom.children_access.append(student_uid)
    
    # Add student to classroom's children_access
    classroom.children_access.append(student_uid)
    db.session.commit()
    
    return jsonify({'msg': 'Classroom joined successfully'})

@api.route('/student_classrooms', methods=['GET'])
def view_student_classrooms():
    student_uid = request.args.get('student_uid')
    student_profile = ChildProfile.query.filter_by(uid=student_uid).first()
    classrooms = Classroom.query.filter(Classroom.uid.in_(student_profile.classrooms_access)).all()
    
    return jsonify([{
        'uid': classroom.uid,
        'title': classroom.title
    } for classroom in classrooms]), 200

@api.route('/create_form', methods=['POST'])
def create_form():
    data = request.get_json()
    teacher_uid = data.get('teacher_uid')
    title = data.get('title')
    questions = data.get('questions')
    
    form = Form(title=title, questions=questions, teacher_uid=teacher_uid)
    db.session.add(form)
    db.session.commit()
    
    # Link form to classroom
    teacher_profile = TeacherProfile.query.filter_by(uid=teacher_uid).first()
    if teacher_profile:
        teacher_profile.Forms_created.append(form.uid)
        db.session.commit()


    return jsonify({'msg': 'Form created', 'form_id': form.uid}), 200

@api.route('/give_access_to_form', methods=['POST'])
def give_access_to_form():
    data = request.get_json()
    form_uid = data.get('form_uid')
    classroom_uid = data.get('classroom_uid')

    form = Form.query.get(form_uid)
    classroom = Classroom.query.get(classroom_uid)

    if not form or not classroom:
        return jsonify({'msg': 'Form or Classroom not found'}), 404

    classroom.form_uids.append(form_uid)
    db.session.commit()

    return jsonify({'msg': 'Access to form granted', 'form_uid': form_uid}), 200

@api.route('/classroom_forms', methods=['GET'])
def classroom_forms():
    classroom_uid = request.args.get('classroom_uid')  # UID passed from frontend

    classroom = Classroom.query.get(classroom_uid)
    forms = Form.query.filter(Form.uid.in_(classroom.form_uids)).all()
    return jsonify([{
        'uid': form.uid,
        'title': form.title,
        'questions': form.questions,
        'attempted': form.attempted_students
    } for form in forms]), 200


@api.route('/submit_form_answers', methods=['POST'])
def submit_form_answers():
    data = request.get_json()
    student_uid = data.get('student_uid')  # UID passed from frontend
    form_uid = data.get('form_uid')
    questions = Form.query.get(form_uid).questions
    answers = data.get('answers')
    feedback = data.get('feedback')

    form_answer = FormAnswer(
        form_id=form_uid,
        student_uid=student_uid,
        questions=questions,
        answers=answers,
        feedback=feedback
    )
    db.session.add(form_answer)
    db.session.commit()

    # Update form record to show this student attempted
    form = Form.query.get(form_uid)
    if form:
        form.attempted_students.append(student_uid)
        db.session.commit()

    return jsonify({'msg': 'Form answers submitted successfully'}), 201


@api.route('/get_form_answers', methods=['GET'])
def get_form_answers():
    child_uid = request.args.get('child_uid')
    form_uid = request.args.get('form_uid')

    if not child_uid or not form_uid:
        return jsonify({'msg': 'Missing required fields'}), 400

    form_answers = FormAnswer.query.filter_by(child_id=child_uid, form_id=form_uid).all()

    if not form_answers:
        return jsonify({'msg': 'No form answers found'}), 404

    response = [
        {
            'question': answer.questions,
            'answer': answer.answers,
            'feedback': answer.feedback
        }
        for answer in form_answers
    ]

    return jsonify(response), 200
