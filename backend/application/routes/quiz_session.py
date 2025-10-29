from flask import Blueprint,request, jsonify
from application.services.quiz_session import add_quiz_session, get_quiz_sessions, update_quiz_session, delete_quiz_session
from application.services.score import get_scores_by_session_id

routes = Blueprint('internal_quiz_session_routes', __name__)

@routes.route('/quiz-session', methods=['GET', 'POST'])
def quiz_session():
    if request.method == 'POST':
        data = request.json
        if 'start_time' not in data or 'end_time' not in data:
            return jsonify({"error": "Start time and end time are required"}), 400
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
        return jsonify({"message": "Quiz session deleted successfully"}), 200
    else:
        data = request.json
        if 'start_time' not in data or 'end_time' not in data:
            return jsonify({"error": "Start time and end time are required"}), 400
        start_time = data['start_time']
        end_time = data['end_time']
        update_quiz_session(quiz_session_id, start_time, end_time)
        return jsonify({"message": "Quiz session updated successfully"}), 200

@routes.route('/quiz-session/<int:quiz_session_id>/scores', methods=['GET'])
def score_by_session_id(quiz_session_id):
    score = get_scores_by_session_id(quiz_session_id)
    return jsonify(score), 200