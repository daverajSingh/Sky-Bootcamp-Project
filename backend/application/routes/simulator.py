from flask import Blueprint, request, jsonify
from application.services.simulator_ai import dialogue
# import the ai service 

routes = Blueprint('simulator_routes', __name__, url_prefix='/api')


@routes.route('/simulator/<int:topic_id>', methods=['POST'])
def get_ai_response_for_user_input(topic_id):
    data = request.json
    user_input = data['text']
    context = data['context']

    #  Call the ai service
    ai_response = dialogue(user_input, context)
    return jsonify({"text":ai_response}), 200




