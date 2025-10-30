from flask import Blueprint,request, jsonify
from application.services.options import add_option, get_options, update_option, delete_option

routes = Blueprint('internal_options_routes', __name__)

@routes.route('/options', methods=['GET', 'POST'])
def options():
    if request.method == 'POST':
        data = request.json
        if 'question_id' not in data or 'option_text' not in data or 'is_correct' not in data:
            return jsonify({"error": "Question ID, option text and is_correct are required"}), 400
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
        if 'option_text' not in data or 'is_correct' not in data:
            return jsonify({"error": "Option text and is_correct are required"}), 400
        option = data['option_text']
        is_correct = data['is_correct']
        update_option(option_id, option, is_correct)
        return jsonify({"message": "Option updated successfully!"}), 200