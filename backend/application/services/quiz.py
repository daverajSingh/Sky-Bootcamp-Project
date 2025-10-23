from application.data_access import DataAccess


def get_quiz_sessions():
    db = DataAccess()
    quiz_sessions = db.query("SELECT session_id, start_time, end_time, time_diff FROM quiz_session;")

    return quiz_sessions

def get_quiz_session(id):
    db = DataAccess()
    quiz_session = db.query("SELECT session_id, start_time, end_time, time_diff FROM quiz_session; WHERE session_id = (%s);", id)

    return quiz_session

def add_quiz_session(start_time, end_time):
    db = DataAccess()
    db.execute("INSERT INTO quiz_session (start_time, end_time)" \
    " VALUES (TIMESTAMP(%s), TIMESTAMP(%s))", (start_time, end_time))


def delete_quiz_sesson(id):
    db = DataAccess()
    db.query("DELETE FROM quiz_session WHERE session_id = (%s);", id)


def update_quiz_session(id, start_time, end_time):

    db = DataAccess()
    quiz_session = db.query("UPDATE quiz_session SET (start_time = (%s), start_time = (%s)) WHERE session_id = (%s);", (start_time, end_time), id)

    return quiz_session