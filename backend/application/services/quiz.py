from application.data_access import DataAccess


def get_quiz_questions():
    db = DataAccess()
    query = """
            SELECT t.topic_id, q.question_id, o.option_id, t.topic_name, q.question_text, o.option_text, o.is_correct
            FROM topic as t 
            INNER JOIN question as q
            ON t.topic_id = q.topic_id
            INNER JOIN options as o
            ON o.question_id = q.question_id
            ORDER BY t.topic_id, q.question_id, o.option_id;
            """
    all_questions = db.query(query)
    return all_questions
