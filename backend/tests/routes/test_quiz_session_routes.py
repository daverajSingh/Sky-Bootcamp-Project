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

    def mock_get_quiz_sessions():
        return [
            {'session_id': 1, 'start_time': '2025-10-01 10:00:00', 'end_time': '2025-10-01 10:15:00',
             'time_diff': '00:15:00'},
            {'session_id': 2, 'start_time': '2025-10-02 11:00:00', 'end_time': '2025-10-02 11:05:00',
             'time_diff': '00:05:00'}
        ]

    def mock_get_scores_by_session_id(session_id):
        return [
            {'score_id': 1, 'topic_id': 1, 'score_value': 2},
            {'score_id': 2, 'topic_id': 2, 'score_value': 1}
        ]

    monkeypatch.setattr("application.routes.quiz_session.get_quiz_sessions", mock_get_quiz_sessions)
    monkeypatch.setattr("application.routes.quiz_session.add_quiz_session", mock_execute_queries)
    monkeypatch.setattr("application.routes.quiz_session.update_quiz_session", mock_execute_queries)
    monkeypatch.setattr("application.routes.quiz_session.delete_quiz_session", mock_execute_queries)
    monkeypatch.setattr("application.routes.quiz_session.get_scores_by_session_id", mock_get_scores_by_session_id)

def test_quiz_session_routes(client, mock_services):
    response = client.get('/quiz-session')
    assert response.status_code == 200
    assert response.json == [
        {'session_id': 1, 'start_time': '2025-10-01 10:00:00', 'end_time': '2025-10-01 10:15:00', 'time_diff': '00:15:00'},
        {'session_id': 2, 'start_time': '2025-10-02 11:00:00', 'end_time': '2025-10-02 11:05:00', 'time_diff': '00:05:00'}
    ]

    response = client.post('/quiz-session', json={'question_id': 1, 'start_time': '2025-10-03 12:00:00', 'end_time': '2025-10-03 12:10:00'})
    assert response.status_code == 200
    assert response.json == {"message": "Quiz session added successfully"}

    response = client.patch('/quiz-session/1', json={'start_time': '2025-10-03 12:05:00', 'end_time': '2025-10-03 12:15:00'})
    assert response.status_code == 200
    assert response.json == {"message": "Quiz session updated successfully"}

    response = client.delete('/quiz-session/1')
    assert response.status_code == 200
    assert response.json == {"message": "Quiz session deleted successfully"}

    response = client.get('/quiz-session/1/scores')
    assert response.status_code == 200
    assert response.json == [
        {'score_id': 1, 'topic_id': 1, 'score_value': 2},
        {'score_id': 2, 'topic_id': 2, 'score_value': 1}
    ]

def test_quiz_session_routes_missing_start_end_time(client):
    response = client.post('/quiz-session', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Start time and end time are required"}

    response = client.patch('/quiz-session/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Start time and end time are required"}

