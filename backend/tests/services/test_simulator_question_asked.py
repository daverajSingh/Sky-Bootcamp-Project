from application.services.simulator_question_asked import get_simulator_question_asked, add_simulator_question_asked, delete_simulator_question_asked, update_simulator_question_asked, get_simulator_question_asked_by_topic_id
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

def test_get_simulator_question_asked_by_topic_id(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'question_asked_id': 3, 'topic_id': 2},
        {'question_asked_id': 4, 'topic_id': 2}
    ]

    questions_asked = get_simulator_question_asked_by_topic_id(1)

    assert len(questions_asked) == 2
    assert questions_asked[0]['topic_id'] == 2
    assert questions_asked[0]['question_asked_id'] == 3
    assert questions_asked[1]['topic_id'] == 2
    assert questions_asked[1]['question_asked_id'] == 4


def test_add_simulator_question_asked(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    add_simulator_question_asked(1)
    mock_instance.execute.assert_called_once_with("INSERT INTO simulator_question_asked (topic_id) VALUES (%s)", 1)

def test_delete_simulator_question_asked(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    delete_simulator_question_asked(1)
    mock_instance.execute.assert_called_once_with("DELETE FROM simulator_question_asked WHERE question_asked_id = (%s)", 1)

def test_update_simulator_question_asked(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    update_simulator_question_asked(1, 1)
    mock_instance.execute.assert_called_once_with("UPDATE simulator_question_asked SET topic_id = (%s) WHERE question_asked_id = (%s)", (1,1))

def test_simulator_question_asked_db_errors(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    mock_instance.execute.side_effect = pymysql.MySQLError("DB Error")
    mock_instance.query.side_effect = pymysql.MySQLError("DB Error")

    with pytest.raises(RuntimeError) as exc_add:
        add_simulator_question_asked(1)
    assert str(exc_add.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_delete:
        delete_simulator_question_asked(1)
    assert str(exc_delete.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_update:
        update_simulator_question_asked(1, 1)
    assert str(exc_update.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get:
        get_simulator_question_asked()
    assert str(query_get.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get_by_id:
        get_simulator_question_asked_by_topic_id(1)
    assert str(query_get_by_id.value) == "Database query error: DB Error"
