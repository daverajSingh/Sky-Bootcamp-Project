import datetime
import os
import jwt
from dotenv import load_dotenv
from flask import request, jsonify, Blueprint
from bcrypt import checkpw, hashpw, gensalt
from application.data_access import DataAccess

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