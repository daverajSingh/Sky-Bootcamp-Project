from application.services.simulator_question_asked import get_simulator_question_asked, add_simulator_question_asked, delete_simulator_question_asked, update_simulator_question_asked
import pymysql
import pytest

DB_ACCESS = 'application.services.simulator_question_asked.DataAccess'

def test_get_simulator_question_asked(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'question_asked_id': 1, 'topic_id': 1},
        {'question_asked_id': 2, 'topic_id': 1},
        {'question_asked_id': 3, 'topic_id': 2},
        {'question_asked_id': 4, 'topic_id': 2}
    ]

    questions_asked = get_simulator_question_asked()

    assert len(questions_asked) == 4
    assert questions_asked[0]['topic_id'] == 1
    assert questions_asked[0]['question_asked_id'] == 1
    assert questions_asked[2]['topic_id'] == 2
    assert questions_asked[2]['question_asked_id'] == 3