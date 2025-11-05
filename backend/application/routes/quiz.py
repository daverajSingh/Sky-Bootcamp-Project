from flask import Blueprint, request, jsonify
from application.services.quiz import get_quiz_questions, insert_quiz_scores, restructure_data, make_date_time_sql_compatible, get_limited_questions
from application.services.quiz_session import add_quiz_session

routes = Blueprint('quiz_routes', __name__, url_prefix='/api')

@routes.route('/quiz', methods=['GET', 'POST'])
def quiz_questions ():

    if request.method == 'POST':
        data = request.json

        if 'start_time' not in data or 'end_time' not in data or 'result' not in data:
            return jsonify({"error": "Invalid Request"}), 400

        start_time = data['start_time']
        end_time = data['end_time']
        result = data['result']

        [start_time_str, end_time_str] = make_date_time_sql_compatible(start_time, end_time)

        session_id = add_quiz_session(start_time_str, end_time_str)

        insert_quiz_scores(session_id, result)

        return jsonify({"message": "Scores submitted successfully"}), 200

    # Get request
    all_quiz_data = get_limited_questions()
    structured_data = restructure_data(all_quiz_data)
    return jsonify(structured_data), 200