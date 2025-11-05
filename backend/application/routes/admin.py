"""
uses the services defined in /services



- user engagement for the last 5 days, week, month.
- quiz performance by topic for the last 5 days, week, month.
- number of questions asked in the simulator by topic 

"""

from flask import Blueprint, request, jsonify
from services.admin import add_question_with_options, get_all_stats
from services.question import add_question

routes = Blueprint('routes',__name__, url_prefix='/admin')

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
    else:
        return 405

