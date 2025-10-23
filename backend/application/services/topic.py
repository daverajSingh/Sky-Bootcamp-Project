from application.data_access import DataAccess


def get_topics():
    db = DataAccess()
    topics = db.query("SELECT topic_id, topic_name FROM topic;")

    return topics

def get_topic(id):
    db = DataAccess()
    topic = db.query("SELECT topic_id, topic_name FROM topic WHERE topic_id = (%s);", id)

    return topic

def add_topic(topic):
    db = DataAccess()
    db.execute("INSERT INTO topic (topic_name) VALUES (%s)", topic)


def delete_topic(id):
    db = DataAccess()
    db.query("DELETE FROM topic WHERE topic_id = (%s);", id)


def update_topic(id, topic):

    db = DataAccess()
    topic = db.query("UPDATE topic SET topic_name = (%s) WHERE topic_id = (%s);", topic, id)

    return topic
    
