from application.data_access import DataAccess
import pymysql

def get_simulator_details():
    db = DataAccess()
    try :
        details = db.query("SELECT detail_id, topic_id, title, intro_text, context FROM simulator_details")
        return details
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def get_simulator_details_by_topic_id(topic_id):
    db = DataAccess()

    try :
        detail = db.query("SELECT detail_id, title, intro_text, context FROM simulator_details WHERE topic_id = (%s)", topic_id)
        return detail
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def add_simulator_detail(topic_id, title, intro_text, context):
    db = DataAccess()
    try :
        db.execute("INSERT INTO simulator_details (topic_id, title, intro_text, context) VALUES (%s, %s, %s, %s)", (topic_id, title, intro_text, context))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def delete_simulator_detail(detail_id):
    db = DataAccess()
    try :
        db.execute("DELETE FROM simulator_details WHERE detail_id = (%s)", detail_id)
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def update_simulator_details(topic_id, title, intro_text, context):
    db = DataAccess()
    try :
        db.execute("UPDATE simulator_details SET title = (%s), intro_text = (%s), context = (%s) WHERE topic_id = (%s)", (title, intro_text, context, topic_id))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')
    
