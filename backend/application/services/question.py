from application.data_access import DataAccess
import pymysql

def get_questions():
    db = DataAccess()
    try :
        questions = db.query("SELECT question_id, topic_id, question_text FROM question")
        return questions
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def get_questions_by_topic_id(topic_id):
    db = DataAccess()

    try :
        question = db.query("SELECT question_id, question_text FROM question WHERE topic_id = (%s)", topic_id)
        return question
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def add_question(topic_id, question):
    db = DataAccess()
    try :
        last_row_id = db.execute("INSERT INTO question (topic_id, question_text) VALUES (%s, %s)", (topic_id, question))
        return last_row_id
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def delete_question(id):
    db = DataAccess()
    try :
        db.execute("DELETE FROM question WHERE question_id = (%s)", id)
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def update_question(id, question):
    db = DataAccess()
    try :
        db.execute("UPDATE question SET question_text = (%s) WHERE question_id = (%s)", (question, id))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')
    
