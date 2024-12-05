from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.dialects.postgresql import ARRAY


class Teacher(db.Model):
    __tablename__ = 'teachers'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)

    def __repr__(self):
        return f'<Teacher {self.email}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)  

    def __repr__(self):
        return f'<Student {self.email}>'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class ChildProfile(db.Model):
    __tablename__ = 'child_profiles'
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    classrooms_access = db.Column(ARRAY(db.Integer))  # Array of classroom UIDs

    def __repr__(self):
        return f'<ChildProfile {self.email}>'

class TeacherProfile(db.Model):
    __tablename__ = 'teacher_profiles'
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    classrooms_created = db.Column(ARRAY(db.Integer))
    forms_created = db.Column(ARRAY(db.Integer))  # Array of classroom UIDs

    def __repr__(self):
        return f'<TeacherProfile {self.email}>'

class Classroom(db.Model):
    __tablename__ = 'classrooms'
    uid = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(256))
    unique_code = db.Column(db.String(64), unique=True, nullable=False)
    title = db.Column(db.String(256), nullable=False)
    children_access = db.Column(ARRAY(db.Integer))  # Array of child UIDs
    teacher_uid = db.Column(db.Integer, db.ForeignKey('teacher_profiles.uid'), nullable=False)
    form_uids = db.Column(ARRAY(db.Integer))  # Array of form UIDs

    def __repr__(self):
        return f'<Classroom {self.title} - Code {self.unique_code}>'
    
class Form(db.Model):
    __tablename__ = 'forms'
    uid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    teacher_uid = db.Column(db.Integer, db.ForeignKey('teacher_profiles.uid'), nullable=False)
    questions = db.Column(db.JSON, nullable=False)  # JSON to store questions
    attempted_students = db.Column(ARRAY(db.Integer))  # Array of student UIDs who attempted

    def __repr__(self):
        return f'<Form {self.title}>'
    
class FormAnswer(db.Model):
    __tablename__ = 'form_answers'
    uid = db.Column(db.Integer, primary_key=True)
    form_uid = db.Column(db.Integer, db.ForeignKey('forms.uid'), nullable=False)
    student_uid = db.Column(db.Integer, db.ForeignKey('child_profiles.uid'), nullable=False)
    questions = db.Column(db.JSON, nullable=False)

    def __repr__(self):
        return f'<FormAnswer Form: {self.form_uid} - Student: {self.student_uid}>'
    
