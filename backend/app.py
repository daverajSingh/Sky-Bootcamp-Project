from flask import Flask
from flask_cors import CORS
from application.data_access import DataAccess
from application.routes.auth import routes as login_routes
from application.routes.quiz import routes as quiz_routes
from application.routes.topic import routes as topic_routes
from application.routes.question import routes as question_routes
from application.routes.options import routes as options_routes
from application.routes.quiz_session import routes as quiz_session_routes
from application.routes.score import routes as score_routes
from application.routes.simulator_details import routes as simulator_details_routes
from application.routes.simulator import routes as simulator_routes
from application.routes.admin import routes as admin_routes
from application.routes.quiz_feedback import routes as quiz_feedback_routes
from application.services.auth import register_post
from dotenv import load_dotenv
import os


def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.register_blueprint(login_routes)
    app.register_blueprint(quiz_routes)
    app.register_blueprint(topic_routes)
    app.register_blueprint(question_routes)
    app.register_blueprint(options_routes)
    app.register_blueprint(quiz_session_routes)
    app.register_blueprint(score_routes)
    app.register_blueprint(simulator_details_routes)
    app.register_blueprint(simulator_routes)
    app.register_blueprint(admin_routes)    
    app.register_blueprint(quiz_feedback_routes)
    CORS(app, resources={r"*": {"origins": os.getenv("FRONT_END_URL")}})

    return app

def create_table():
    db = DataAccess()
    try:
        db.execute_file('sql_scripts/admin.sql')
        db.execute_file('sql_scripts/faq.sql')
        db.execute_file('sql_scripts/quiz.sql')
        db.execute_file('sql_scripts/simulator.sql')
        db.execute_stored_procedures('sql_scripts/stats_procedures.sql')
    except Exception as e:
        print(e)

def seed_admin():
    """Insert an initial admin user if not present. Controlled via env vars.

    Uses ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME. If not set, no-op.
    """
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")
    name = os.getenv("ADMIN_NAME")
    register_post(email, password, name)
    

if __name__ == "__main__":
    app = create_app()
    create_table()
    seed_admin()
    app.run(host="0.0.0.0", debug=True, port=5000)

