from flask import Blueprint,request, jsonify
from application.services.score import add_score, get_scores, delete_score, update_score

routes = Blueprint('internal_score_routes', __name__)

@routes.route('/score', methods=['GET', 'POST'])
def scores():
    if request.method == 'POST':
        data = request.json
        if 'topic_id' not in data or 'session_id' not in data or 'score_value' not in data:
            return jsonify({"error": "Topic ID, session ID and score value are required"}), 400
        topic_id = data['topic_id']
        session_id = data['session_id']
        score_value = data['score_value']
        add_score(topic_id, session_id, score_value)
        return jsonify({"message": "Score added successfully"}), 200
    else:
        all_scores = get_scores()
        return jsonify(all_scores), 200

@routes.route('/score/<int:score_id>', methods=['DELETE', 'PATCH'])
def score_by_id(score_id):
    if request.method == 'PATCH':
        data = request.json
        if 'score_value' not in data:
            return jsonify({"error": "Score value is required"}), 400
        score_value = data['score_value']
        update_score(score_id, score_value)
        return jsonify({"message": "Score updated successfully"}), 200
    else:
        delete_score(score_id)
        return jsonify({"message": "Score deleted successfully"}), 200
