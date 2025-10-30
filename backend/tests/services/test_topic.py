from application.services.topic import get_topic, get_topics, delete_topic, update_topic, add_topic
import pymysql
import pytest

DB_ACCESS = 'application.services.topic.DataAccess'

def test_get_topics(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'topic_id': 1, 'topic_name': 'Topic 1'},
        {'topic_id': 2, 'topic_name': 'Topic 2'}
    ]

    topics = get_topics()
    assert len(topics) == 2
    assert topics[0]['topic_name'] == 'Topic 1'
    assert topics[1]['topic_name'] == 'Topic 2'

def test_get_topic(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    mock_instance.query.return_value = [
        {'topic_id':1, 'topic_name':'Topic 3'}
    ]
    topic = get_topic(1)
    assert len(topic) == 1
    assert topic[0]['topic_name'] == 'Topic 3'

def test_add_topic(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    add_topic("New Topic")
    mock_instance.execute.assert_called_once_with("INSERT INTO topic (topic_name) VALUES (%s)", "New Topic")

def test_delete_topic(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    delete_topic(1)
    mock_instance.execute.assert_called_once_with("DELETE FROM topic WHERE topic_id = (%s);", 1)

def test_update_topic(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    update_topic(1, 'Updated Topic')
    mock_instance.execute.assert_called_once_with("UPDATE topic SET topic_name = (%s) WHERE topic_id = (%s);", ('Updated Topic', 1))

def test_topic_db_errors(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    mock_instance.execute.side_effect = pymysql.MySQLError("DB Error")
    mock_instance.query.side_effect = pymysql.MySQLError("DB Error")

    with pytest.raises(RuntimeError) as exc_add:
        add_topic("New Topic")
    assert str(exc_add.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_delete:
        delete_topic(1)
    assert str(exc_delete.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as exc_update:
        update_topic(1, "Updated Topic")
    assert str(exc_update.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get:
        get_topics()
    assert str(query_get.value) == "Database query error: DB Error"

    with pytest.raises(RuntimeError) as query_get_by_id:
        get_topic(1)
    assert str(query_get_by_id.value) == "Database query error: DB Error"