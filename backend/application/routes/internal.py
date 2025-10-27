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
        if 'name' not in data:
            return jsonify({"error": "Topic name is required"}), 400
        topic = data['name']
        add_topic(topic)
        return jsonify({"message": "Topic added successfully"}), 200
    else:
        all_topics = get_topics()
        return jsonify(all_topics), 200


@routes.route('/topic/<int:topic_id>', methods=['PATCH', 'DELETE'])
def update_topic_by_id(topic_id):
    if request.method == 'DELETE':
        delete_topic(topic_id)
        return jsonify({"message": "Topic deleted successfully"}), 200
    else:
        data = request.json
        if 'name' not in data:
            return jsonify({"error": "Topic name is required"}), 400
        topic_name = data['name']
        update_topic(topic_id, topic_name)
        return jsonify({"message": "Topic updated successfully"}), 200


@routes.route('/questions', methods=['GET', 'POST'])
def questions():
    if request.method == 'POST':
        data = request.json
        if 'topic_id' not in data or 'question_text' not in data:
            return jsonify({"error": "Topic ID and question text are required"}), 400
        topic_id = data['topic_id']
        question = data['question_text']
        add_question(topic_id, question)
        return jsonify({"message": "Question added successfully"}), 200
    else:
        all_questions = get_questions()
        return jsonify(all_questions), 200


@routes.route('/question/<int:question_id>', methods=['PATCH', 'DELETE'])
def update_question_by_id(question_id):
    if request.method == 'DELETE':
        delete_question(question_id)
        return jsonify({"message": "Question deleted successfully"}), 200
    else:
        data = request.json
        if 'question_text' not in data:
            return jsonify({"error": "Question text is required"}), 400
        question_text = data['question_text']
        update_question(question_id, question_text)
        return jsonify({"message": "Question updated successfully!"}), 200


@routes.route('/topic/<int:topic_id>/questions', methods=['GET'])
def questions_by_topic_id(topic_id):
    questions_by_topic = get_questions_by_topic_id(topic_id)
    return jsonify(questions_by_topic), 200


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


@routes.route('/option/<int:option_id>', methods=['PATCH', 'DELETE'])
def update_options_by_id(option_id):
    if request.method == 'DELETE':
        delete_option(option_id)
        return jsonify({"message": "Option deleted successfully"}), 200
    else:
        data = request.json
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


@routes.route('/quiz-session/<int:quiz_session_id>', methods=['PATCH', 'DELETE'])
def update_quiz_session_by_id(quiz_session_id):
    if request.method == 'DELETE':
        delete_quiz_session(quiz_session_id)
        return jsonify({"message": "Quiz-session deleted successfully"}), 200
    else:
        data = request.json
        start_time = data['start_time']
        end_time = data['end_time']
        update_quiz_session(quiz_session_id, start_time, end_time)
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

@routes.route('/score/<int:score_id>', methods=['GET', 'DELETE', 'PATCH'])
def score_by_id(score_id):
    if  request.method == 'GET':
        score = get_score(score_id)
        return jsonify(score), 200
    elif request.method == 'PATCH':
        data = request.json
        topic_id = data['topic_id']
        session_id = data['session_id']
        score_value = data['score_value']
        update_score(score_id, topic_id, session_id, score_value)
        return jsonify({"message": "Quiz-session updated successfully!"}), 200
    else:
        delete_score(score_id)
        return jsonify({"message": "Score deleted successfully"}), 200

@routes.route('/quiz-session/<int:quiz_session_id>/score', methods=['GET'])
def score_by_session_id(quiz_session_id):
    score = get_scores_by_session_id(quiz_session_id)
    return jsonify(score), 200

@routes.route('/topic/<int:topic_id>/score', methods=['GET'])
def score_by_topic_id(topic_id):
    score = get_scores_by_topic_id(topic_id)
    return jsonify(score), 200