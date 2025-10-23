from application.data_access import DataAccess


def get_questions():
    db = DataAccess()
    topics = db.query("SELECT question_id, topic_id, question_text FROM question;")

    return topics

def get_questions_by_topic_id(topic_id):
    db = DataAccess()
    topic = db.query("SELECT question_id, question_text FROM question WHERE topic_id = (%s);", topic_id)

    return topic

def add_question(topic_id, question):
    db = DataAccess()
    db.execute("INSERT INTO question (topic_id, question_text) VALUES (%s, %s)", (topic_id, question))


def delete_question(id):
    db = DataAccess()
    db.execute("DELETE FROM question WHERE question_id = (%s);", id)


def update_question(id, question):
    db = DataAccess()
    db.execute("UPDATE question SET question_text = (%s) WHERE question_id = (%s);", (question, id))
    
