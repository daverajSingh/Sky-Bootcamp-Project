
from flask import jsonify
from application.data_access import DataAccess

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
        simulation_questions = db.query("CALL GetSimulationQuestionCount()")
        quiz_performance = db.query("CALL GetCorrectAnswersGraph()")
        daily = db.query("CALL GetQuizTrendDaily(6)")
        weekly = db.query("CALL GetQuizTrendWeekly(6)")
        monthly = db.query("CALL GetQuizTrendMonthly(11)")
        overall_kpis = db.query("CALL GetOverallKPIs()")
        userActivity = {
            "daily": daily,
            "weekly": weekly,
            "monthly": monthly
        }
        return {
            "simulationQuestions": simulation_questions,
            "overallKPIs": overall_kpis,
            "charts": {
                "quizPerformance": quiz_performance,
                "userActivity": userActivity
            }
        }
    except Exception as e:
        raise RuntimeError(f"Failed to get stats for admin page: {e}")
    finally:
        db.close()

