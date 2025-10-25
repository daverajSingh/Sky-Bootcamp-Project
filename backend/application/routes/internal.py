from flask import Blueprint,request, jsonify
from application.services.topic import add_topic, get_topics, delete_topic, update_topic
from application.services.question import add_question, get_questions, delete_question, update_question, get_questions_by_topic_id
from application.services.quiz_session import add_quiz_session, get_quiz_sessions, update_quiz_session, delete_quiz_session
from application.services.options import add_option, get_options, update_option, delete_option, get_options_by_question_id
from application.services.score import add_score, get_score, get_scores_by_session_id, get_scores_by_topic_id, get_scores, delete_score, update_score

routes = Blueprint('internal_routes', __name__)

# Postman test routes
@routes.route('/topics', methods=['GET', 'POST'])
def topics():
    if request.method == 'POST':
        data = request.json
        topic = data['name']
        add_topic(topic)
        return jsonify({"message": "Topic added successfully"}), 200
    else:
        all_topics = get_topics()
        return jsonify(all_topics), 200


@routes.route('/topic/<int:id>', methods=['PATCH', 'DELETE'])
def update_topic_by_id(id):
    if request.method == 'DELETE':
        delete_topic(id)
        return jsonify({"message": "Topic deleted successfully"}), 200
    else:
        data = request.json
        topic_id = id
        topic_name = data['name']
        updated_topic = update_topic(topic_id, topic_name)
        return jsonify(updated_topic), 200


@routes.route('/questions', methods=['GET', 'POST'])
def question():
    if request.method == 'POST':
        data = request.json
        topic_id = data['topic_id']
        question = data['question_text']
        add_question(topic_id, question)
        return jsonify({"message": "Question added successfully"}), 200
    else:
        questions = get_questions()
        return jsonify(questions), 200


@routes.route('/question/<int:id>', methods=['PATCH', 'DELETE'])
def update_question_by_id(id):
    if request.method == 'DELETE':
        delete_question(id)
        return jsonify({"message": "Question deleted successfully"}), 200
    else:
        data = request.json
        question_id = id
        question_text = data['question_text']
        update_question(question_id, question_text)
        return jsonify({"message": "Question updated successfully!"}), 200


@routes.route('/topic/<int:id>/questions', methods=['GET'])
def questions_by_topic_id(id):
    questions = get_questions_by_topic_id(id)
    return jsonify(questions), 200


@routes.route('/options', methods=['GET', 'POST'])
def options():
    if request.method == 'POST':
        data = request.json
        question_id = data['question_id']
        option = data['option_text']
        is_correct = data['is_correct']
        add_option(question_id, option, is_correct)
        return jsonify({"message": "Option added successfully"}), 200
    else:
        all_options = get_options()
        return jsonify(all_options), 200


@routes.route('/option/<int:id>', methods=['PATCH', 'DELETE'])
def update_options_by_id(id):
    if request.method == 'DELETE':
        delete_option(id)
        return jsonify({"message": "Option deleted successfully"}), 200
    else:
        data = request.json
        option_id = id
        option = data['option_text']
        is_correct = data['is_correct']
        update_option(option_id, option, is_correct)
        return jsonify({"message": "Option updated successfully!"}), 200


@routes.route('/question/<int:id>/options', methods=['GET'])
def options_by_question_id(id):
    options_for_a_question = get_options_by_question_id(id)
    return jsonify(options_for_a_question), 200


@routes.route('/quiz-session', methods=['GET', 'POST'])
def quiz_session():
    if request.method == 'POST':
        data = request.json
        start_time = data['start_time']
        end_time = data['end_time']
        add_quiz_session(start_time, end_time)
        return jsonify({"message": "Quiz session added successfully"}), 200
    else:
        all_quiz_session = get_quiz_sessions()
        return jsonify(all_quiz_session), 200


@routes.route('/quiz-session/<int:id>', methods=['PATCH', 'DELETE'])
def update_quiz_session_by_id(id):
    if request.method == 'DELETE':
        delete_quiz_session(id)
        return jsonify({"message": "Quiz-session deleted successfully"}), 200
    else:
        data = request.json
        session_id = id
        start_time = data['start_time']
        end_time = data['end_time']
        update_quiz_session(session_id, start_time, end_time)
        return jsonify({"message": "Quiz-session updated successfully!"}), 200


@routes.route('/score', methods=['GET', 'POST'])
def scores():
    if request.method == 'POST':
        data = request.json
        topic_id = data['topic_id']
        session_id = data['session_id']
        score_value = data['score_value']
        add_score(topic_id, session_id, score_value)
        return jsonify({"message": "Score added successfully"}), 200
    else:
        all_scores = get_scores()
        return jsonify(all_scores), 200

@routes.route('/score/<int:id>', methods=['GET', 'DELETE', 'PATCH'])
def score_by_id(id):
    if  request.method == 'GET':
        score = get_score(id)
        return jsonify(score), 200
    elif request.method == 'PATCH':
        data = request.json
        score_id = id
        topic_id = data['topic_id']
        session_id = data['session_id']
        score_value = data['score_value']
        update_score(score_id, topic_id, session_id, score_value)
        return jsonify({"message": "Quiz-session updated successfully!"}), 200
    else:
        delete_score(id)
        return jsonify({"message": "Score deleted successfully"}), 200

@routes.route('/session/<int:id>/score/', methods=['GET'])
def score_by_session_id(id):
    score = get_scores_by_session_id(id)
    return jsonify(score), 200

@routes.route('/topic/<int:id>/score/', methods=['GET'])
def score_by_topic_id(id):
    score = get_scores_by_topic_id(id)
    return jsonify(score), 200