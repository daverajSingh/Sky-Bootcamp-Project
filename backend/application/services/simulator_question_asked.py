from application.data_access import DataAccess
import pymysql

def get_simulator_question_asked():
    db = DataAccess()
    try :
        details = db.query("SELECT question_asked_id, topic_id FROM simulator_question_asked")
        return details
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def get_simulator_question_asked_by_topic_id(topic_id):
    db = DataAccess()

    try :
        detail = db.query("SELECT question_asked_id context FROM simulator_question_asked WHERE topic_id = (%s)", topic_id)
        return detail
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def add_simulator_question_asked(topic_id):
    db = DataAccess()
    try :
        db.execute("INSERT INTO simulator_question_asked (topic_id) VALUES (%s)", (topic_id))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def delete_simulator_question_asked(question_asked_id):
    db = DataAccess()
    try :
        db.execute("DELETE FROM simulator_question_asked WHERE question_asked_id = (%s)", question_asked_id)
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def update_simulator_question_asked(question_asked_id, topic_id):
    db = DataAccess()
    try :
        db.execute("UPDATE simulator_question_asked SET topic_id = (%s) WHERE question_asked_id = (%s)", (question_asked_id))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')
    
