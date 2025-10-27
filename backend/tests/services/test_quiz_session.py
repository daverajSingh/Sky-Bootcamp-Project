from application.services.quiz_session import get_quiz_sessions, add_quiz_session, delete_quiz_session, update_quiz_session
import pymysql
import pytest

DB_ACCESS = 'application.services.quiz_session.DataAccess'

#create test for get quiz sessions
def test_get_quiz_sessions(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'session_id': 1, 'start_time': '2025-10-01 10:00:00', 'end_time': '2025-10-01 10:15:00', 'time_diff': '00:15:00'},
        {'session_id': 2, 'start_time': '2025-10-02 11:00:00', 'end_time': '2025-10-02 11:05:00', 'time_diff': '00:05:00'}
    ]

    quiz_sessions = get_quiz_sessions()
    assert len(quiz_sessions) == 2
    assert quiz_sessions[0]['time_diff'] == '00:15:00'
    assert quiz_sessions[1]['time_diff'] == '00:05:00'

def test_add_quiz_session(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    
    add_quiz_session('2023-10-01 10:00:00', '2023-10-01 10:30:00')
    mock_instance.execute.assert_called_once_with('INSERT INTO quiz_session (start_time, end_time) VALUES (%s, %s)', ('2023-10-01 10:00:00', '2023-10-01 10:30:00'))

def test_delete_quiz_session(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    delete_quiz_session(1)
    mock_instance.execute.assert_called_once_with('DELETE FROM quiz_session WHERE session_id = (%s)', 1)

def test_update_quiz_session(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    update_quiz_session(1,'2025-10-27 12:00:00','2025-10-27 12:00:01')
    mock_instance.execute.assert_called_once_with("UPDATE quiz_session SET start_time = (%s), end_time = (%s) WHERE session_id = (%s)", ('2025-10-27 12:00:00','2025-10-27 12:00:01',1))

def test_update_quiz_session_db_error(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    mock_instance.execute.side_effect = pymysql.MySQLError("DB Error")

    try:
        update_quiz_session(1,'2025-10-27 12:00:00','2025-10-27 12:00:01')
    except RuntimeError as e:
        assert str(e) == "Database query error: DB Error"   

def test_quiz_session_db_errors(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    mock_instance.execute.side_effect = pymysql.MySQLError("DB Error")
    mock_instance.query.side_effect = pymysql.MySQLError("DB Error")

    with pytest.raises(RuntimeError) as exc_add:
        add_quiz_session('2025-10-27 12:00:00','2025-10-27 12:00:01')
    assert str(exc_add.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_delete:
        delete_quiz_session(1)
    assert str(exc_delete.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_update:
        update_quiz_session(1,'2025-10-27 12:00:00','2025-10-27 12:00:01')
    assert str(exc_update.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get:
        get_quiz_sessions()
    assert str(query_get.value) == "Database query error: DB Error"





