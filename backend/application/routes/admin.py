from flask import Blueprint, request, jsonify
from application.services.admin import get_all_stats, add_question_with_options
from application.services.question import add_question

routes = Blueprint('admin',__name__, url_prefix='/api/admin')

@routes.route('/get_stats', methods=['GET'])
def get_stats():
    if request.method == 'GET':
        all_stats = get_all_stats()
        return all_stats, 200
    else:
        return 405

@routes.route('/add_new_question', methods=['POST'])
def add_question_and_options():
    if request.method == 'POST':
        data = request.json
        question = data['question']
        topic_id = data['question_topic']
        options = data['options']
        correct_option_idx = data['correct_id']
        question_id = add_question(topic_id, question)
        add_question_with_options(question_id, options, correct_option_idx)
        return jsonify({"message": f"Question ID: {question_id} and options added successfully"}), 201
    else:
        return 405

