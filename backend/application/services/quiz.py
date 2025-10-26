from application.data_access import DataAccess
from collections import defaultdict
from datetime import datetime
import random
import pymysql

def get_quiz_questions():
    db = DataAccess()
    try:
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
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def get_limited_questions(limit):
    try :
        all_questions = get_quiz_questions()

        limited_questions = limit_questions_per_topic(all_questions, limit)
        return limited_questions
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def insert_quiz_scores(session_id, result):
    db = DataAccess()

    try:
        # Accumulate scores per topic
        topic_scores = defaultdict(int)
        for entry in result:
            topic_name = entry.get("topicID")
            is_correct = entry.get("isCorrect")
            if topic_name and is_correct:
                topic_scores[topic_name] += 1

        # Batch insert
        values = []
        for topic_name, score_value in topic_scores.items():
            topic_result = db.query("SELECT topic_id FROM topic WHERE topic_name = %s", (topic_name,))
            if not topic_result:
                continue
            topic_id = topic_result[0]["topic_id"]
            values.append((topic_id, session_id, score_value))

        if values:
            placeholders = ', '.join(['(%s, %s, %s)'] * len(values))
            flat_values = [item for row in values for item in row]
            query = f"INSERT INTO score (topic_id, session_id, score_value) VALUES {placeholders}"
            db.execute(query, tuple(flat_values))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


# Helper methods
def create_option(item):
    return {
        "text": item["option_text"],
        "is_correct": bool(item["is_correct"])
    }


def add_question_if_new(topic_questions, item):
    question_id = item["question_id"]
    if not any(q["questionID"] == question_id for q in topic_questions):
        topic_questions.append({
            "questionID": question_id,
            "question": item["question_text"],
            "options": [create_option(item)]
        })
    else:
        for q in topic_questions:
            if q["questionID"] == question_id:
                q["options"].append(create_option(item))
                break


def restructure_data(flat_data):
    topics = defaultdict(lambda: {"questions": []})
    for item in flat_data:
        topic_name = item["topic_name"]
        add_question_if_new(topics[topic_name]["questions"], item)

    return [
        {
            "topicID": topic,
            "questions": data["questions"]
        }
        for topic, data in topics.items()
    ]

def make_date_time_sql_compatible(start_time, end_time):
    # 'Sat, 25 Oct 2025 17:46:20 GMT'
    start_time = datetime.strptime(start_time, "%a, %d %b %Y %H:%M:%S %Z")
    end_time = datetime.strptime(end_time, "%a, %d %b %Y %H:%M:%S %Z")

    # Format for MySQL
    start_time_str = start_time.strftime("%Y-%m-%d %H:%M:%S")
    end_time_str = end_time.strftime("%Y-%m-%d %H:%M:%S")

    return [start_time_str, end_time_str]

def limit_questions_per_topic(all_questions, limit):
    # Group by topic -> question -> options
    topic_question_map = defaultdict(lambda: defaultdict(list))
    for row in all_questions:
        topic_id = row['topic_id']
        question_id = row['question_id']
        topic_question_map[topic_id][question_id].append(row)

    # Randomly select questions
    final_questions = []
    for topic_id, questions in topic_question_map.items():
        selected_q_ids = random.sample(list(questions.keys()), min(limit, len(questions)))
        # add options for the question selected
        for qid in selected_q_ids:
            final_questions.extend(questions[qid])

    return final_questions