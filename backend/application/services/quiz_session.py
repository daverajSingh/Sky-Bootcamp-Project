from application.data_access import DataAccess
import pymysql


def get_quiz_sessions():
    db = DataAccess()

    try:
        quiz_sessions = db.query("SELECT session_id, start_time, end_time, TIME_FORMAT(time_diff, '%H:%i:%s') AS time_diff FROM quiz_session")
        return quiz_sessions
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def get_quiz_session(session_id):
    db = DataAccess()

    try:
        quiz_session = db.query("SELECT session_id, start_time, end_time, TIME_FORMAT(time_diff, '%H:%i:%s') AS time_diff FROM quiz_session; WHERE session_id = (%s)", session_id)
        return quiz_session
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def add_quiz_session(start_time, end_time):
    db = DataAccess()
    try:
        db.execute("INSERT INTO quiz_session (start_time, end_time) VALUES (TIMESTAMP(%s), TIMESTAMP(%s))", (start_time, end_time))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def delete_quiz_session(id):
    db = DataAccess()

    try:
        db.execute("DELETE FROM quiz_session WHERE session_id = (%s)", id)
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def update_quiz_session(session_id, start_time, end_time):
    db = DataAccess()

    try:
        quiz_session = db.execute("UPDATE quiz_session SET start_time = (%s), end_time = (%s) WHERE session_id = (%s)", (start_time, end_time, session_id))
        return quiz_session
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')