from flask import Flask
from flask_cors import CORS
from application.data_access import DataAccess
from application.routes.auth import routes as login_routes
from application.routes.quiz import routes as quiz_routes
from application.routes.internal import routes as internal_routes
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": os.getenv("FRONT_END_URL")}})
    app.register_blueprint(login_routes)
    app.register_blueprint(quiz_routes)
    app.register_blueprint(internal_routes)
    
    return app

def create_table():
    db = DataAccess()
    try:
        db.execute_file('sql_scripts/admin.sql')
        db.execute_file('sql_scripts/faq.sql')
        db.execute_file('sql_scripts/quiz.sql')
    except Exception as e:
        print(e)

if __name__ == "__main__":
    app = create_app()
    create_table()
    app.run(debug=True, port=5000)

