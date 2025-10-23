import datetime
import os
import jwt
from dotenv import load_dotenv
from flask import request, jsonify, Blueprint
from bcrypt import checkpw, hashpw, gensalt
from application.data_access import DataAccess
from application.services.topic import add_topic, get_topics, delete_topic, update_topic
from application.services.question import add_question, get_questions, delete_question, update_question,get_questions_by_topic_id
from application.services.quiz import add_quiz_session, get_quiz_sessions
from application.services.options import add_option, get_options

load_dotenv()

routes = Blueprint('routes',__name__)

@routes.route('/api/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.json
        email = data['email']
        password = data['password']

        if not email or not password:
            return jsonify({"error": "Missing Credentials"}), 400

        db = DataAccess()

        try:
            user = db.query("Select admin_email, admin_password, admin_name FROM admin WHERE admin_email=%s",(email,),)
            if not user:
                return jsonify({"error": "Invalid Username or Password"}), 401

            user = user[0]
            stored_hash = user['admin_password'].encode('utf-8')

            if not checkpw(password.encode('utf-8'), stored_hash):
                return jsonify({"error": "Invalid Username or Password"}), 401

            token = jwt.encode(
                {
                    'admin_email': user['admin_email'],
                    'admin_name': user['admin_name'],
                    'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=30),
                    'iat': datetime.datetime.now(datetime.UTC),
                },
                os.getenv('SECRET_KEY'),
                algorithm='HS256',
            )
            return jsonify({"message": "Successful Login", "token": token}), 200
        finally:
            db.close()
    else:
        return jsonify({"error": "Invalid Method"}), 405

@routes.route('/api/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.json
        email = data['email']
        password = data['password']
        name = data['name']

        if not email or not password:
            return jsonify({"error": "Missing Credentials"}), 400

        db = DataAccess()
        try:
            # Check if username already exists
            existing = db.query("SELECT admin_id FROM admin WHERE admin_email=%s", (email,))
            if existing:
                return jsonify({"error": "Email already in use"}), 409
            hashed_password = hashpw(password.encode('utf-8'), gensalt()).decode('utf-8')
            db.execute("INSERT into admin (admin_email, admin_password, admin_name) VALUES (%s, %s, %s) ", (email, hashed_password, name),)
            return jsonify({"message": "Successful Register"}), 200
        finally:
            db.close()
    else:
        return jsonify({"error": "Invalid Method"}), 405


# Postman test routes
@routes.route('/topics', methods=['GET', 'POST'])
def topics():
    if request.method == 'POST':
        data = request.json
        topic = data['name']
        add_topic(topic)
        return jsonify({"message": "Topic addition was successful"}), 200
    else :
        all_topics = get_topics()
        return jsonify(all_topics), 200

@routes.route('/quiz-session', methods=['GET', 'POST'])
def quiz_session():
    if request.method == 'POST':
        data = request.json
        start_time = data['start_time']
        end_time = data['end_time']
        add_quiz_session(start_time, end_time)
        return jsonify({"message": "Quiz session addition was successful"}), 200
    else :
        all_quiz_session = get_quiz_sessions()
        
        return jsonify(all_quiz_session), 200
    
@routes.route('/topics/<int:id>', methods=['PATCH', 'DELETE'])
def update_topic_by_id(id):
    if request.method == 'DELETE':
        delete_topic(id)
        return jsonify({"message": "Topic deletion was successful"}), 200
    else:
        data = request.json
        topic_id = id
        topic_name = data['name']
        updated_topic = update_topic(topic_id, topic_name)
        return jsonify(updated_topic), 200
    

@routes.route('/questions', methods=['GET', 'POST'])
def question():
    if request.method == 'POST':
        data = request.json
        topic_id = data['topic_id']
        question = data['question_text']
        add_question(topic_id, question)
        return jsonify({"message": "Question addition was successful"}), 200
    else :
        questions = get_questions()
        return jsonify(questions), 200

@routes.route('/questions/<int:id>', methods=['PATCH', 'DELETE'])
def update_question_by_id(id):
    if request.method == 'DELETE':
        delete_question(id)
        return jsonify({"message": "Question deletion was successful"}), 200
    else:
        data = request.json
        question_id = id
        question_text = data['question_text']
        update_question(question_id, question_text)
        return jsonify({"message": "Question updated successfully!"}), 200


@routes.route('/questions/topics/<int:id>', methods=['GET'])
def questions_by_topic_id(id):
    questions = get_questions_by_topic_id(id)
    return jsonify(questions), 200


@routes.route('/options', methods=['GET', 'POST'])
def options():
    if request.method == 'POST':
        data = request.json
        question_id = data['question_id']
        option = data['option_text']
        is_correct = data['is_correct']
        add_option(question_id, option, is_correct)
        return jsonify({"message": "Option addition was successful"}), 200
    else :
        all_options = get_options()
        return jsonify(all_options), 200