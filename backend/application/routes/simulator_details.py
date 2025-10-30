from flask import Blueprint,request, jsonify
from application.services.simulator_details import add_simulator_detail, get_simulator_details, update_simulator_details, delete_simulator_detail

routes = Blueprint('internal_simulator_routes', __name__)

# Postman test routes
@routes.route('/simulator-details', methods=['GET', 'POST'])
def simulator_details():
    if request.method == 'POST':
        data = request.json
        if 'topic_id' not in data or 'intro_text' not in data or 'title' not in data or 'context' not in data :
            return jsonify({"error": "Topic ID, introduction text, title for AI and context are required"}), 400
        topic_id = data['topic_id']
        title = data['title']
        intro_text = data['intro_text']
        context = data['context']
        add_simulator_detail(topic_id, title, intro_text, context)
        return jsonify({"message": "Detail added successfully"}), 200
    else:
        all_details = get_simulator_details()
        return jsonify(all_details), 200

@routes.route('/simulator-details/<int:detail_id>', methods=['PATCH', 'DELETE'])
def update_question_by_id(detail_id):
    if request.method == 'DELETE':
        delete_simulator_detail(detail_id)
        return jsonify({"message": "Detail deleted successfully"}), 200
    else:
        data = request.json
        if 'topic_id' not in data or 'intro_text' not in data or 'title' not in data or 'context' not in data:
            return jsonify({"error": "Topic ID, introduction text, title for AI and context are required"}), 400
        topic_id = data['topic_id']
        title = data['title']
        intro_text = data['intro_text']
        context = data['context']
        update_simulator_details(topic_id, title, intro_text, context)
        return jsonify({"message": "Detail updated successfully!"}), 200