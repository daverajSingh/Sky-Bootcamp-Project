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
        query_create_topic = """        
        CREATE TABLE IF NOT EXISTS topic (
        `topic_id` int PRIMARY KEY NOT NULL auto_increment,
        `topic_name` varchar(255) NOT NULL UNIQUE
        );
        """

        query_create_question = """
        CREATE TABLE IF NOT EXISTS question (
        `question_id` int PRIMARY KEY NOT NULL auto_increment,
        `topic_id` int NOT NULL,
        `question_text` varchar(255) NOT NULL,
        FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE
        );
        """

        query_create_options = """
        CREATE TABLE IF NOT EXISTS options (
        `option_id` int PRIMARY KEY NOT NULL auto_increment,
        `question_id` int NOT NULL,
        `option_text` varchar(255) NOT NULL,
        `is_correct` boolean NOT NULL,
        FOREIGN KEY (question_id) REFERENCES question (question_id) ON DELETE CASCADE
        );
        """

        query_create_quiz_session = """
            CREATE TABLE IF NOT EXISTS quiz_session (
            `session_id` int PRIMARY KEY NOT NULL auto_increment,
            `start_time` TIMESTAMP NOT NULL,
            `end_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `time_diff` TIME GENERATED ALWAYS AS (SEC_TO_TIME(TIMESTAMPDIFF(SECOND, start_time, end_time))) STORED
            );
        """

        query_create_score = """
            CREATE TABLE IF NOT EXISTS score (
            `score_id` int PRIMARY KEY NOT NULL auto_increment,
            `topic_id` int NOT NULL,
            `session_id` int NOT NULL,
            `score_value` int NOT NULL,
            FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE,
            FOREIGN KEY (session_id) REFERENCES quiz_session (session_id) ON DELETE CASCADE
            );
        """

        db.execute_file('sql_scripts/admin.sql')
        db.execute_file('sql_scripts/faq.sql')
        db.execute(query_create_quiz_session)
        db.execute(query_create_topic)
        db.execute(query_create_question)
        db.execute(query_create_options)
        db.execute(query_create_score)

    except Exception as e:
        print(e)

if __name__ == "__main__":
    app = create_app()
    create_table()
    app.run(debug=True, port=5000)

