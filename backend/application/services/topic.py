from application.data_access import DataAccess
import pymysql

def get_topics():
    db = DataAccess()

    try :
        topics = db.query("SELECT topic_id, topic_name FROM topic;")
        return topics
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')
   

def get_topic(topic_id):
    db = DataAccess()

    try :
        topic = db.query("SELECT topic_id, topic_name FROM topic WHERE topic_id = (%s);", topic_id)
        return topic
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def add_topic(topic):
    db = DataAccess()

    try :
        db.execute("INSERT INTO topic (topic_name) VALUES (%s)", topic)
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def delete_topic(topic_id):
    db = DataAccess()

    try :
        db.execute("DELETE FROM topic WHERE topic_id = (%s);", topic_id)
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def update_topic(topic_id, topic):
    db = DataAccess()

    try :
        db.execute("UPDATE topic SET topic_name = (%s) WHERE topic_id = (%s);", (topic, topic_id))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')
    
