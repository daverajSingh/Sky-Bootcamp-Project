from application.data_access import DataAccess


def get_options():
    db = DataAccess()
    topics = db.query("SELECT option_id, question_id, option_text, is_correct FROM options;")

    return topics

def get_options_by_question_id(question_id):
    db = DataAccess()
    topic = db.query("SELECT option_id, option_text, is_correct FROM options WHERE question_id = (%s);", question_id)

    return topic

def add_option(question_id, option, is_correct):
    db = DataAccess()
    db.execute("INSERT INTO options (question_id, option_text, is_correct) VALUES (%s, %s, %s)", (question_id, option, is_correct))


def delete_option(id):
    db = DataAccess()
    db.execute("DELETE FROM options WHERE option_id = (%s);", id)


def update_option(id, question_id, option, is_correct):
    db = DataAccess()
    db.execute("UPDATE options SET question_id = (%s), option_text = (%s), is_correct=(%s) WHERE option_id = (%s);", (question_id, option, is_correct, id))
    
