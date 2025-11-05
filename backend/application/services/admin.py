
from flask import jsonify
from data_access import DataAccess

def add_question_with_options(question_id, options, correct_option_index):
    if len(options) != 4:
        raise ValueError("Exactly 4 options must be provided.")
    
    db = DataAccess()
    try:
        db.execute(
            "CALL AddQuestionOptions(%s, %s, %s, %s, %s, %s)",
            (question_id, options[0], options[1], options[2], options[3], correct_option_index)
        )
        return jsonify({"message": "Options for Question ID: {question_id} added successfully"}), 20
    except Exception as e:
        raise RuntimeError(f"Failed to add question options: {e}")
    finally:
        db.close()

def get_all_stats():
    try:
        db = DataAccess()
        quiz_stats = db.execute(
            "CALL get_quiz_performance_by_topic()"
        )
        user_engagement = db.execute(
            "CALL get_user_engagement()"
        )
        question_stats = db.execute(
            "CALL get_question_stats_by_topic()"
        )
        time_stats = db.execute(
            "CALL get_time_spent_stats()"
        )
        return {
            "quiz_stats": quiz_stats,
            "user_engagement": user_engagement,
            "question_stats": question_stats,
            "time_stats": time_stats
        }
    except Exception as e:
        raise RuntimeError(f"Failed to get stats for admin page: {e}")
    finally:
        db.close()

