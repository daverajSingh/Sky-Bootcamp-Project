from flask import Blueprint, request, jsonify
from application.services.quiz_feedback_ai import generate_quiz_feedback

routes = Blueprint('quiz_feedback_routes', __name__, url_prefix='/api')

@routes.route('/quiz/feedback', methods=['POST'])
def get_quiz_feedback():
    """
    Generate AI-powered feedback for quiz results.
    
    Expected JSON body:
    {
        "results": [
            {
                "questionText": "...",
                "topicID": "...",
                "isCorrect": true/false,
                "correctIndices": [...],
                "selectedIndices": [...]
            },
            ...
        ]
    }
    
    Returns:
    {
        "feedback": "Your personalized feedback message"
    }
    """
    data = request.json
    
    if not data or 'results' not in data:
        return jsonify({"error": "Results are required"}), 400
    
    results = data['results']
    
    if not isinstance(results, list) or len(results) == 0:
        return jsonify({"error": "Results must be a non-empty list"}), 400
    
    try:
        feedback = generate_quiz_feedback(results)
        return jsonify({"feedback": feedback}), 200
    except Exception as e:
        print(f"Error generating quiz feedback: {e}")
        return jsonify({"error": "Failed to generate feedback"}), 500
