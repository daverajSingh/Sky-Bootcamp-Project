from dotenv import load_dotenv
from flask import request, jsonify, Blueprint
from application.services import login_post, register_post
load_dotenv()

routes = Blueprint('routes',__name__, url_prefix='/api')

@routes.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        data = request.json
        email = data['email']
        password = data['password']
        return login_post(email, password)
    else:
        return jsonify({"error": "Invalid Method"}), 405

@routes.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.json
        email = data['email']
        password = data['password']
        name = data['name']
        return register_post(email, password, name)
    else:
        return jsonify({"error": "Invalid Method"}), 405
    
