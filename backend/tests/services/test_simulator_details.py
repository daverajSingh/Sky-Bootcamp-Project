from application.services.simulator_details import get_simulator_details, get_simulator_details_by_topic_id, add_simulator_detail, delete_simulator_detail, update_simulator_details
import pymysql
import pytest

DB_ACCESS = 'application.services.simulator_details.DataAccess'

def test_get_simulator_details(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'detail_id': 1, 'topic_id': 1, 'title': 'AI - 1', 'intro_text':'Topic 1 Intro', 'context': 'Topic 1 Context'},
        {'detail_id': 2, 'topic_id': 2, 'title': 'AI - 2', 'intro_text':'Topic 2 Intro', 'context': 'Topic 2 Context'}
    ]

    details = get_simulator_details()
    assert len(details) == 2
    assert details[0]['topic_id'] == 1
    assert details[1]['topic_id'] == 2
    assert details[0]['title'] == 'AI - 1'
    assert details[1]['title'] == 'AI - 2'
    assert details[0]['intro_text'] == 'Topic 1 Intro'
    assert details[1]['intro_text'] == 'Topic 2 Intro'
    assert details[0]['context'] == 'Topic 1 Context'
    assert details[1]['context'] == 'Topic 2 Context'

def test_get_simulator_details_by_topic_id(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
       {'detail_id': 1, 'title': 'AI - 1', 'intro_text':'Topic 1 Intro', 'context': 'Topic 1 Context'},
    ]

    details = get_simulator_details_by_topic_id(1)
    assert len(details) == 1
    assert details[0]['detail_id'] == 1
    assert details[0]['title'] == 'AI - 1'
    assert details[0]['intro_text'] == 'Topic 1 Intro'
    assert details[0]['context'] == 'Topic 1 Context'

def test_add_simulator_detail(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    add_simulator_detail(1, "AI - 1", "Topic 1 Intro", "Topic 1 Context")
    mock_instance.execute.assert_called_once_with("INSERT INTO simulator_details (topic_id, title, intro_text, context) VALUES (%s, %s, %s, %s)", (1, "AI - 1", "Topic 1 Intro", "Topic 1 Context"))

def test_delete_simulator_details(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    delete_simulator_detail(1)
    mock_instance.execute.assert_called_once_with("DELETE FROM simulator_details WHERE detail_id = (%s)", 1)

def test_update_simulator_details(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    update_simulator_details(1, 'Updated Title', 'Updated Intro', 'Updated Context')
    mock_instance.execute.assert_called_once_with("UPDATE simulator_details SET title = (%s), intro_text = (%s), context = (%s) WHERE topic_id = (%s)", ('Updated Title', 'Updated Intro', 'Updated Context', 1))

def test_simualtor_details_db_errors(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    mock_instance.execute.side_effect = pymysql.MySQLError("DB Error")
    mock_instance.query.side_effect = pymysql.MySQLError("DB Error")

    with pytest.raises(RuntimeError) as exc_add:
        add_simulator_detail(1, "AI - 1", "Topic 1 Intro", "Topic 1 Context")
    assert str(exc_add.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_delete:
        delete_simulator_detail(1)
    assert str(exc_delete.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_update:
        update_simulator_details(1, 'Updated Title', 'Updated Intro', 'Updated Context')
    assert str(exc_update.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get:
        get_simulator_details()
    assert str(query_get.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get_by_id:
        get_simulator_details_by_topic_id(1)
    assert str(query_get_by_id.value) == "Database query error: DB Error"
