from flask import request, jsonify
from flask_cors import cross_origin
from app import db
from models import Teacher, Student, TeacherProfile, ChildProfile, Classroom, Form, FormAnswer
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import timedelta
import json
from sqlalchemy.sql.expression import any_
import requests

def register_routes(app):
    @app.route('/api/teacher-classrooms',  methods=['GET'])
    def view_teacher_classrooms():
        teacher_uid = request.args.get('teacher_uid')
        
        classrooms = Classroom.query.filter_by(teacher_uid=teacher_uid).all()
        return jsonify([{'uid': classroom.uid, 'title': classroom.title, 'unique_code': classroom.unique_code, 'description' : classroom.description} for classroom in classrooms]), 200


    @app.route('/api/teacher-forms',  methods=['GET'])
    def view_teacher_forms():
        teacher_uid = request.args.get('teacher_uid')
        
        forms = Form.query.filter_by(teacher_uid=teacher_uid).all()
        return jsonify([{'uid': form.uid, 'title': form.title} for form in forms]), 200


    @app.route('/api/signup', methods=['POST'])
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

            profile = TeacherProfile(uid=new_user.id, email=new_user.email, classrooms_created=[], forms_created=[])
            db.session.add(profile)
            db.session.commit()
            
        elif role == 'student':
            existing_user = Student.query.filter_by(email=email).first()
            if existing_user:
                return jsonify({'msg': 'Student already exists'}), 400
            new_user = Student(email=email)
            new_user.set_password(password)
            db.session.add(new_user)
            db.session.commit()
            
            profile = ChildProfile(uid=new_user.id, email=new_user.email, classrooms_access=[])
            db.session.add(profile)
            db.session.commit()
        else:
            return jsonify({'msg': 'Invalid role'}), 400

        return jsonify({
            'msg': 'User created successfully'
        }), 201
    
    @app.route('/api/login', methods=['POST'])
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


    @app.route('/api/createclassroom', methods=['POST'])
    def create_classroom():
        try:
            data = request.get_json()
            title = data.get('title')
            desciption = data.get('description')
            unique_code = data.get('unique_code')
            teacher_id = data.get('uid')
            
            # Update teacher's classrooms_created array
            teacher_profile = TeacherProfile.query.get(teacher_id)

            if teacher_profile.classrooms_created is None: 
                teacher_profile.classrooms_created = []

            classroom = Classroom(title=title, description=desciption, unique_code=unique_code, teacher_uid=teacher_id, children_access=[], form_uids=[])
            db.session.add(classroom)
            db.session.commit()

            classroom_created_set = set(teacher_profile.classrooms_created)

            if classroom.uid not in classroom_created_set:
                # Assign a new list to ensure SQLAlchemy tracks the change
                classroom_created_set.add(classroom.uid)
                teacher_profile.classrooms_created = list(classroom_created_set)
                db.session.commit()
                return jsonify({'msg': 'Access to form granted', 'form_uid': classroom.uid}), 200
            else:
                return jsonify({'msg': 'Form already has access to classroom'}), 200
        except Exception as e: 
            return jsonify({'msg': 'Failed to create classroom', 'error': str(e)}), 500

    @app.route('/api/classroom_join', methods=['POST'])
    def join_classroom():
        data = request.get_json()
        code = data.get('code')
        student_uid = data.get('student_uid')
        
        classroom = Classroom.query.filter_by(unique_code=code).first()
        childProfile = ChildProfile.query.filter_by(uid=student_uid).first()

        if not classroom:
            return jsonify({'msg': 'Classroom not found'}), 404
        
        if not childProfile: 
            return jsonify({'msg': 'Student profile not found'}), 404
        
        if classroom.children_access is None: 
                classroom.children_access = []
                db.session.commit()
        
        if childProfile.classrooms_access is None:
                childProfile.classrooms_access = []
                db.session.commit()

        classroom_children_set = set(classroom.children_access)
        student_classrooms_set = set(childProfile.classrooms_access)

    
        if classroom.uid not in student_classrooms_set:
            # Assign a new list to ensure SQLAlchemy tracks the change
            student_classrooms_set.add(classroom.uid)
            childProfile.classrooms_access = list(student_classrooms_set)
            db.session.commit()


        student_uid = int(student_uid)
        if student_uid not in classroom_children_set:
            # Assign a new list to ensure SQLAlchemy tracks the change
            classroom_children_set.add(student_uid)
            classroom.children_access = list(classroom_children_set)
            db.session.commit()
            return jsonify({'msg': 'Student added to classroom'}), 200

        return jsonify({'msg': 'Student already in classroom'}), 200

    @app.route('/api/student_classrooms', methods=['GET'])
    def view_student_classrooms():
        student_uid = request.args.get('student_uid')
        student_profile = ChildProfile.query.filter_by(uid=student_uid).first()
        classrooms = Classroom.query.filter(Classroom.uid.in_(student_profile.classrooms_access)).all()
        
        return jsonify([{
            'uid': classroom.uid,
            'title': classroom.title,
            'unique_code': classroom.unique_code, 
            'description' : classroom.description
        } for classroom in classrooms]), 200

    @app.route('/api/create_form', methods=['POST'])
    def create_form():
        data = request.get_json()
        teacher_uid = data.get('teacher_uid')
        title = data.get('title')
        questions = data.get('questions')
        
        teacher_profile = TeacherProfile.query.filter_by(uid=teacher_uid).first()

        if teacher_profile.forms_created is None: 
            teacher_profile.forms_created = []
        
        form = Form(title=title, teacher_uid=teacher_uid, questions=questions, attempted_students=[])
        db.session.add(form)
        db.session.commit()

        # Link form to classroom
        if teacher_profile:
            teacher_profile.forms_created.append(form.uid)
            db.session.commit()

        teacher_profile_forms = set(teacher_profile.forms_created)

        if form.uid not in teacher_profile_forms:
            # Assign a new list to ensure SQLAlchemy tracks the change
            teacher_profile_forms.add(form.uid) 
            teacher_profile.forms_created = list(teacher_profile_forms)
            db.session.commit()
            return jsonify({'msg': 'Access to form granted', 'form_uid': form.uid}), 200
        
        return jsonify({'msg': 'Form already has access to classroom'}), 200

    @app.route('/api/give_access_to_form', methods=['POST'])
    def give_access_to_form():
        data = request.get_json()
        form_uid = data.get('form_uid')
        classroom_uid = data.get('classroom_uid')

        form = Form.query.get(form_uid)
        classroom = Classroom.query.get(classroom_uid)

        if not form or not classroom:
            return jsonify({'msg': 'Form or Classroom not found'}), 404
        
        if  classroom.form_uids is None: 
             classroom.form_uids = []
             db.session.commit()

        clasroom_uids = set(classroom.form_uids)

        form_uid = int(form_uid)

        if form_uid not in clasroom_uids:
            # Assign a new list to ensure SQLAlchemy tracks the change
            clasroom_uids.add(form_uid)
            classroom.form_uids = list(clasroom_uids)
            db.session.commit()
            return jsonify({'msg': 'Access to form granted', 'form_uid': form_uid}), 200

        return jsonify({'msg': 'Form already has access to classroom'}), 200

    @app.route('/api/classroom_forms', methods=['GET'])
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

    FEEDBACK_SERVICE_URL = 'http://192.168.70.47:8000/quiz/provide_feedback'

    @app.route('/api/submit_form_answers', methods=['POST'])
    def submit_form_answers():
        try:
            data = request.get_json()
            student_uid = request.args.get('student_uid')  # UID passed from frontend
            form_uid = request.args.get('form_uid')
            questions = data.get('Questions')

            if not form_uid or not student_uid or not questions:
                return jsonify({"message": "Invalid data provided."}), 400
            
            feedback_payload = {'questions': questions}
            feedback_response = requests.post(FEEDBACK_SERVICE_URL, json=feedback_payload)

            if feedback_response.status_code != 200:
                return jsonify({"message": "Failed to generate feedback."}), 300
            
            feedback_data = feedback_response.json()
            updated_questions = feedback_data.get('questions')

            form_answer = FormAnswer(
                form_uid=form_uid,
                student_uid=student_uid,
                questions=updated_questions,
            )
            db.session.add(form_answer)
            db.session.commit()

            # Update form record to show this student attempted
            form = Form.query.get(form_uid)
            if form:
                attempted_students = form.attempted_students or []
                student_uid = int(student_uid)

                if student_uid not in attempted_students:
                    attempted_students.append(student_uid)
                    form.attempted_students = attempted_students
                    db.session.commit()


            return jsonify({'msg': 'Form answers submitted successfully'}), 201
        except Exception as e:
            return jsonify({"message": "An error occurred while submitting the form."}), 100


    @app.route('/api/get_form_answers', methods=['GET'])
    def get_form_answers():
        student_uid = request.args.get('student_uid')
        form_uid = request.args.get('form_uid')

        if not student_uid or not form_uid:
            return jsonify({'msg': 'Missing required fields'}), 400
        
        form = Form.query.get(form_uid)

        form_answer = FormAnswer.query.filter_by(student_uid=student_uid, form_uid=form_uid).first()

        if not form_answer:
            return jsonify({'msg': 'No form answers found'}), 404

        return jsonify({
            "title": form.title,
            'uid': form.uid,
            "Questions": form_answer.questions
        }), 200
    
    @app.route('/api/classroom/students', methods=['GET'])
    def get_classroom_students():
        # Retrieve the classroom by its unique ID
        classroom_uid = request.args.get('classroom_uid')
        classroom = Classroom.query.get(classroom_uid)

        # Check if the classroom exists
        if not classroom:
            return jsonify({'msg': 'Classroom not found'}), 404

        # Check if there are children with access to the classroom
        if not classroom.children_access:
            return jsonify({
                'classroom': {
                    'uid': classroom.uid,
                    'title': classroom.title,
                    'unique_code': classroom.unique_code,
                    'description': classroom.description  # optional description field
                },
                'students': []  # Empty list if no students are in the classroom
            }), 200

        # Query for emails of all child profiles with UIDs in the children_access list
        
        student_info = ChildProfile.query.filter(ChildProfile.uid.in_(classroom.children_access)).all()

        students = [{'uid': student.uid, 'email': student.email} for student in student_info]

        return jsonify({
            'classroom': {
                'uid': classroom.uid,
                'title': classroom.title,
                'unique_code': classroom.unique_code,
                'description': classroom.description  # optional description field
            },
            'students': students
        }), 200
    
    @app.route('/api/form', methods=['GET'])
    def get_form_data():
        # Retrieve the form by its unique ID
        form_uid = request.args.get('form_uid')
        form = Form.query.get(form_uid)

        # Check if the form exists
        if not form:
            return jsonify({'msg': 'Form not found'}), 404

        # Check if the form was attempted by any students
        if not form.attempted_students:
            return jsonify({
                'form': {
                    'uid': form.uid,
                    'title': form.title,
                    'Questions': form.questions
                },
                'students': []  # Empty list if no students are in the classroom
            }), 200

        # Query for emails of all child profiles with UIDs in the children_access list
        student_info = ChildProfile.query.filter(ChildProfile.uid.in_(form.attempted_students)).all()

        students = [{'uid': student.uid, 'email': student.email} for student in student_info]

        return jsonify({
            'form': {
                'uid': form.uid,
                'title': form.title,
                'Questions': form.questions
            },
            'students': students
        }), 200

    @app.route('/api/get_student_forms', methods=['GET'])
    def get_forms_status():
        classroom_uid = request.args.get('classroomUid')
        student_uid = request.args.get('studentUid')

        if not classroom_uid or not student_uid:
            return jsonify({'msg': 'Classroom UID or Student UID missing'}), 400

        # Fetch classroom and validate
        classroom = Classroom.query.filter_by(uid=classroom_uid).first()
        if not classroom:
            return jsonify({'msg': 'Classroom not found'}), 404

        # Fetch all forms for the classroom
        form_uids = classroom.form_uids or []
        forms = Form.query.filter(Form.uid.in_(form_uids)).all()

        attempted_forms = []
        pending_forms = []

        for form in forms:
            # Check if the student UID exists in the form's attempted students
            attempted_students = form.attempted_students or [] 
            student_uid = int(student_uid)

            if student_uid not in attempted_students:
                pending_forms.append({
                    'uid': form.uid,
                    'title': form.title,
                })
            else:
                attempted_forms.append({
                    'uid': form.uid,
                    'title': form.title,
                })
        return jsonify({
            'attempted_forms': attempted_forms,
            'pending_forms': pending_forms
        }), 200


    @app.route('/api/student_form', methods=['GET'])
    def get_form_():
        # Retrieve the form by its unique ID
        form_uid = request.args.get('form_uid')
        form = Form.query.get(form_uid)

        # Check if the form exists
        if not form:
            return jsonify({'msg': 'Form not found'}), 404

       
        return jsonify({
            'uid': form.uid,
            'title': form.title,
            'Questions': form.questions
        }), 200
