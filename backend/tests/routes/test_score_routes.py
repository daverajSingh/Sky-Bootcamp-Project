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

    def mock_execute_queries(*args, **kwargs):
        # Mock function to simulate database updates/inserts/deletes
        pass

    def mock_get_scores():
        return [
            {'score_id': 1, 'topic_id': 1, 'session_id': 1, 'score_value': 2},
            {'score_id': 2, 'topic_id': 2, 'session_id': 1, 'score_value': 1},
            {'score_id': 3, 'topic_id': 1, 'session_id': 2, 'score_value': 1},
            {'score_id': 4, 'topic_id': 2, 'session_id': 2, 'score_value': 1}
        ]

    monkeypatch.setattr("application.routes.score.get_scores", mock_get_scores)
    monkeypatch.setattr("application.routes.score.add_score", mock_execute_queries)
    monkeypatch.setattr("application.routes.score.update_score", mock_execute_queries)
    monkeypatch.setattr("application.routes.score.delete_score", mock_execute_queries)

def test_score_routes(client, mock_services):
    response = client.get('/score')
    assert response.status_code == 200
    assert response.json == [
        {'score_id': 1, 'topic_id': 1, 'session_id': 1, 'score_value': 2},
        {'score_id': 2, 'topic_id': 2, 'session_id': 1, 'score_value': 1},
        {'score_id': 3, 'topic_id': 1, 'session_id': 2, 'score_value': 1},
        {'score_id': 4, 'topic_id': 2, 'session_id': 2, 'score_value': 1}
    ]

    response = client.post('/score', json={'topic_id': 1, 'session_id': 1, 'score_value': 3})
    assert response.status_code == 200
    assert response.json == {"message": "Score added successfully"}

    response = client.patch('/score/1', json={'score_value': 4})
    assert response.status_code == 200
    assert response.json == {"message": "Score updated successfully"}

    response = client.delete('/score/1')
    assert response.status_code == 200
    assert response.json == {"message": "Score deleted successfully"}


def test_score_routes_missing_score_details(client):
    response = client.post('/score', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Topic ID, session ID and score value are required"}

    response = client.patch('/score/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Score value is required"}