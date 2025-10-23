from application.data_access import DataAccess


def get_quiz_sessions():
    db = DataAccess()
    quiz_sessions = db.query("SELECT session_id, start_time, end_time, time_diff FROM quiz_session;")

    return quiz_sessions

def get_quiz_session(id):
    db = DataAccess()
    quiz_session = db.query("SELECT session_id, start_time, end_time, time_diff FROM quiz_session; WHERE session_id = (%s);", id)

    return quiz_session

def add_quiz_session(start_time, end_time, time_diff):
    db = DataAccess()
    db.execute("INSERT INTO quiz_session (start_time, end_time, time_diff) VALUES (DateTime, DateTime, DateTime)", start_time, end_time, time_diff)


# def delete_topic(id):
#     db = DataAccess()
#     db.query("DELETE FROM topic WHERE topic_id = (%s);", id)


# def update_topic(id, topic):

#     db = DataAccess()
#     topic = db.query("UPDATE topic SET topic_name = (%s) WHERE topic_id = (%s);", topic, id)

#     return topic