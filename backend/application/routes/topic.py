from flask import Blueprint,request, jsonify
from application.services.topic import add_topic, get_topics, delete_topic, update_topic
from application.services.question import get_questions_by_topic_id
from application.services.score import get_scores_by_topic_id

routes = Blueprint('internal_topic_routes', __name__)

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

@routes.route('/topic/<int:topic_id>/questions', methods=['GET'])
def questions_by_topic_id(topic_id):
    questions_by_topic = get_questions_by_topic_id(topic_id)
    return jsonify(questions_by_topic), 200

@routes.route('/topic/<int:topic_id>/scores', methods=['GET'])
def score_by_topic_id(topic_id):
    score = get_scores_by_topic_id(topic_id)
    return jsonify(score), 200