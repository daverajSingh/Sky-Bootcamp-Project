from flask import Blueprint, request, jsonify
from collections import defaultdict
from application.services.quiz import get_quiz_questions


routes = Blueprint('quiz_routes', __name__, url_prefix='/api')

@routes.route('/quiz', methods=['GET'])
def quiz_questions ():

    if request.method == 'GET':
        all_quiz_data = get_quiz_questions()
        structured_data = restructure_data(all_quiz_data)
        return jsonify(structured_data), 200
    else:
        return jsonify({"error": "Invalid Method"}), 405

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
    
    return  [
            {
                "topicID": topic,
                "questions": data["questions"]
            }
            for topic, data in topics.items()
        ]