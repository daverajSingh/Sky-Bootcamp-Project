from application.data_access import DataAccess


def get_score():
    db = DataAccess()
    scores = db.query("SELECT score_id, topic_id, session_id, score_value FROM score;")

    return scores

def get_score(id):
    db = DataAccess()
    score = db.query("SELECT score_id, topic_id, session_id, score_value FROM score; WHERE session_id = (%s);", id)

    return score

def add_score(start_time, end_time):
    db = DataAccess()
    db.execute("INSERT INTO score (start_time, end_time)" \
    " VALUES (TIMESTAMP(%s), TIMESTAMP(%s))", (start_time, end_time))


def delete_quiz_sesson(id):
    db = DataAccess()
    db.query("DELETE FROM score WHERE session_id = (%s);", id)


def update_score(id, start_time, end_time):

    db = DataAccess()
    score = db.query("UPDATE score SET (start_time = (%s), start_time = (%s)) WHERE session_id = (%s);", (start_time, end_time), id)

    return score