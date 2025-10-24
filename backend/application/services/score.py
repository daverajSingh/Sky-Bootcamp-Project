from application.data_access import DataAccess


def get_scores():
    db = DataAccess()
    scores = db.query("SELECT score_id, topic_id, session_id, score_value FROM score;")

    return scores

def get_score(id):
    db = DataAccess()
    score = db.query("SELECT score_id, topic_id, session_id, score_value FROM score; WHERE session_id = (%s);", id)

    return score

def add_score(topic_id, session_id, score_value):
    db = DataAccess()
    db.execute("INSERT INTO score (topic_id, session_id, score_value)" \
    " VALUES (%s, %s, %s)", (topic_id, session_id, score_value))


def delete_score(id):
    db = DataAccess()
    db.query("DELETE FROM score WHERE session_id = (%s);", id)


def update_score(id, score_value):

    db = DataAccess()
    db.query("UPDATE score SET (score_value = (%s)); WHERE score_id = (%s)", score_value, id)