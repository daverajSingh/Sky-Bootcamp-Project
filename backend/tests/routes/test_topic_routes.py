import pytest
from app import create_app

@pytest.fixture
def app():
    return create_app()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def mock_services(monkeypatch):

    def mock_get_topics():
        return [{'topic_id': 1, 'topic_name': 'Topic 1'}, {'topic_id': 2, 'topic_name': 'Topic 2'}]

    def mock_execute_queries(*args, **kwargs):
        # Mock function to simulate database updates/inserts/deletes
        pass

    def mock_get_questions_by_topic_id(topic_id):
        return [{'question_id': 1, 'question_text': 'Question 1'}]

    def mock_get_scores_by_topic_id(topic_id):
        return [
            {'score_id': 1, 'session_id': 1, 'score_value': 2},
            {'score_id': 3, 'session_id': 2, 'score_value': 1}
        ]

    monkeypatch.setattr("application.routes.topic.get_topics", mock_get_topics)
    monkeypatch.setattr("application.routes.topic.add_topic", mock_execute_queries)
    monkeypatch.setattr("application.routes.topic.update_topic", mock_execute_queries)
    monkeypatch.setattr("application.routes.topic.delete_topic", mock_execute_queries)
    monkeypatch.setattr("application.routes.topic.get_questions_by_topic_id", mock_get_questions_by_topic_id)
    monkeypatch.setattr("application.routes.topic.get_scores_by_topic_id", mock_get_scores_by_topic_id)

def test_topics_routes(client, mock_services):
    response = client.get('/topics')
    assert response.status_code == 200
    assert response.json == [{'topic_id': 1, 'topic_name': 'Topic 1'}, {'topic_id': 2, 'topic_name': 'Topic 2'}]
    
    response = client.post('/topics', json={'name': 'New Topic'})
    assert response.status_code == 200
    assert response.json == {"message": "Topic added successfully"}

    response = client.patch('/topic/1', json={'name': 'Updated Topic'})
    assert response.status_code == 200
    assert response.json == {"message": "Topic updated successfully"}

    response = client.delete('/topic/1')
    assert response.status_code == 200
    assert response.json == {"message": "Topic deleted successfully"}

    response = client.get('/topic/1/scores')
    assert response.status_code == 200
    assert response.json == [
        {'score_id': 1, 'session_id': 1, 'score_value': 2},
        {'score_id': 3, 'session_id': 2, 'score_value': 1}
    ]

    response = client.get('/topic/1/questions')
    assert response.status_code == 200
    assert response.json == [{'question_id': 1, 'question_text': 'Question 1'}]

def test_topics_routes_missing_topic_name(client):
    response = client.post('/topics', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Topic name is required"}

    response = client.patch('/topic/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Topic name is required"}

