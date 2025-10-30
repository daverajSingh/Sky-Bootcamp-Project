from flask import Blueprint,request, jsonify
from application.services.question import add_question, get_questions, delete_question, update_question
from application.services.options import get_options_by_question_id

routes = Blueprint('internal_question_routes', __name__)

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

@routes.route('/question/<int:question_id>/options', methods=['GET'])
def options_by_question_id(question_id):
    options_for_a_question = get_options_by_question_id(question_id)
    return jsonify(options_for_a_question), 200