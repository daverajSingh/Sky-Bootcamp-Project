from flask import Flask
from flask_cors import CORS
from application.data_access import DataAccess
from application.routes import routes

app = Flask(__name__)
CORS(app)
app.register_blueprint(routes)

def create_table():
    db = DataAccess()
    try:
        query = """
        CREATE TABLE IF NOT EXISTS admin (
        `admin_id` int PRIMARY KEY NOT NULL auto_increment, 
        `admin_email` varchar(255) NOT NULL, 
        `admin_password` varchar(255) NOT NULL, 
        `admin_name` varchar(50) NOT NULL
        );
        """
        query_create_topic ="""        
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
        query_create_quiz = """
            CREATE TABLE IF NOT EXISTS quiz_session (
            `session_id` int PRIMARY KEY NOT NULL auto_increment,
            `start_time` TIMESTAMP NOT NULL,
            `end_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `time_diff` int AS (end_time - start_time)
            );"""
        query_create_score = """
            CREATE TABLE IF NOT EXISTS score (
            `score_id` int PRIMARY KEY NOT NULL auto_increment
            `topic_id` int NOT NULL,
            `session_id` int NOT NULL,
            `score_value` int NOT NULL
            FOREIGN KEY (topic_id) REFERENCES topic (topic_id) ON DELETE CASCADE
            FOREIGN KEY (session_id) REFERENCES quiz_session (topic_id) ON DELETE CASCADE
            );"""
        db.execute(query)
        db.execute(query_create_topic)
        db.execute(query_create_question)
        db.execute(query_create_options)
        db.execute(query_create_quiz)
    except Exception as e:
        print(e)


from application import routes

if __name__ == "__main__":
    create_table()
    app.run(debug=True, port=5000)