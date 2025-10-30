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
from dotenv import load_dotenv
import os

load_dotenv()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": os.getenv("FRONT_END_URL")}})
    app.register_blueprint(login_routes)
    app.register_blueprint(quiz_routes)
    app.register_blueprint(topic_routes)
    app.register_blueprint(question_routes)
    app.register_blueprint(options_routes)
    app.register_blueprint(quiz_session_routes)
    app.register_blueprint(score_routes)
    app.register_blueprint(simulator_details_routes)
    app.register_blueprint(simulator_routes)

    
    return app

def create_table():
    db = DataAccess()
    try:
        db.execute_file('sql_scripts/admin.sql')
        db.execute_file('sql_scripts/faq.sql')
        db.execute_file('sql_scripts/quiz.sql')
        db.execute_file('sql_scripts/simulator.sql')
    except Exception as e:
        print(e)

if __name__ == "__main__":
    app = create_app()
    create_table()
    app.run(debug=True, port=5000)

