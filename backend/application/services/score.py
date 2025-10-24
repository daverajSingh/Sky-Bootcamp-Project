from application.data_access import DataAccess
import pymysql

def get_scores():
    db = DataAccess()

    try:
        scores = db.query("SELECT score_id, topic_id, session_id, score_value FROM score;")
        return scores    
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def get_score(id):
    db = DataAccess()

    try:
        score = db.query("SELECT score_id, topic_id, session_id, score_value FROM score; WHERE session_id = (%s);", id)
        return score    
    except:
        raise RuntimeError(f'Database query error: {e}')


def add_score(topic_id, session_id, score_value):
    db = DataAccess()

    try:
        db.execute("INSERT INTO score (topic_id, session_id, score_value)" \
        " VALUES (%s, %s, %s)", (topic_id, session_id, score_value))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def delete_score(id):
    db = DataAccess()

    try:
        db.query("DELETE FROM score WHERE session_id = (%s);", id)
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def update_score(id, score_value):

    db = DataAccess()
    try:
        db.query("UPDATE score SET (score_value = (%s)); WHERE score_id = (%s)", score_value, id)   
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')