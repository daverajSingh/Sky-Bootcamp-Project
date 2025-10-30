from application.services.score import add_score, get_scores_by_session_id, get_scores_by_topic_id, get_scores, delete_score, update_score
import pymysql
import pytest

DB_ACCESS = 'application.services.score.DataAccess'

def test_get_scores(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'score_id': 1, 'topic_id': 1, 'session_id': 1, 'score_value': 1},
        {'score_id': 2, 'topic_id': 1, 'session_id': 1, 'score_value': 2}
    ]

    scores = get_scores()
    assert len(scores) == 2
    assert scores[0]['score_value'] == 1
    assert scores[1]['score_value'] == 2

def test_scores_by_session_id(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'score_id': 1, 'topic_id': 1, 'session_id': 1, 'score_value': 1},
        {'score_id': 2, 'topic_id': 1, 'session_id': 1, 'score_value': 2}
    ]

    scores = get_scores_by_session_id(1)
    assert len(scores) == 2
    assert scores[0]['score_value'] == 1
    assert scores[1]['score_value'] == 2

def test_scores_by_topic_id(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'score_id': 1, 'topic_id': 1, 'session_id': 1, 'score_value': 1},
        {'score_id': 2, 'topic_id': 1, 'session_id': 1, 'score_value': 2}
    ]

    scores = get_scores_by_topic_id(1)
    assert len(scores) == 2
    assert scores[0]['score_value'] == 1
    assert scores[1]['score_value'] == 2

def test_add_score(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    add_score(1, 2, 3)
    mock_instance.execute.assert_called_once_with("INSERT INTO score (topic_id, session_id, score_value) VALUES (%s, %s, %s)", (1, 2, 3))

def test_delete_score(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    delete_score(1)
    mock_instance.execute.assert_called_once_with("DELETE FROM score WHERE score_id = (%s)", 1)

def test_update_score(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    update_score(1, 2)
    mock_instance.execute.assert_called_once_with("UPDATE score SET score_value = (%s) WHERE score_id = (%s)", (2, 1))

def test_score_db_errors(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    mock_instance.execute.side_effect = pymysql.MySQLError("DB Error")
    mock_instance.query.side_effect = pymysql.MySQLError("DB Error")

    with pytest.raises(RuntimeError) as exc_add:
        add_score(1, 2, 3)
    assert str(exc_add.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_delete:
        delete_score(1)
    assert str(exc_delete.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_update:
        update_score(1, 2)
    assert str(exc_update.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get:
        get_scores()
    assert str(query_get.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get_by_s_id:
        get_scores_by_session_id(1)
    assert str(query_get_by_s_id.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get_by_t_id:
        get_scores_by_topic_id(1)
    assert str(query_get_by_t_id.value) == "Database query error: DB Error"