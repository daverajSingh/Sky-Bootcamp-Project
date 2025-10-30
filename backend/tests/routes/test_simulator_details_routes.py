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

    def mock_get_simulator_details():
        return [
            {'detail_id': 1, 'topic_id': 1, 'title': 'AI - 1', 'intro_text':'Topic 1 Intro', 'context': 'Topic 1 Context'},
            {'detail_id': 2, 'topic_id': 2, 'title': 'AI - 2', 'intro_text':'Topic 2 Intro', 'context': 'Topic 2 Context'}
        ]

    monkeypatch.setattr("application.routes.simulator_details.get_simulator_details", mock_get_simulator_details)
    monkeypatch.setattr("application.routes.simulator_details.add_simulator_detail", mock_execute_queries)
    monkeypatch.setattr("application.routes.simulator_details.update_simulator_details", mock_execute_queries)
    monkeypatch.setattr("application.routes.simulator_details.delete_simulator_detail", mock_execute_queries)

def test_question_routes(client, mock_services):
    response = client.get('/simulator-details')
    assert response.status_code == 200
    assert response.json == [
            {'detail_id': 1, 'topic_id': 1, 'title': 'AI - 1', 'intro_text':'Topic 1 Intro', 'context': 'Topic 1 Context'},
            {'detail_id': 2, 'topic_id': 2, 'title': 'AI - 2', 'intro_text':'Topic 2 Intro', 'context': 'Topic 2 Context'}
        ]

    response = client.post('/simulator-details', json={"topic_id": 2, "title": "AI - 2", "intro_text":"Topic 2 Intro", "context": "Topic 2 Context"})
    assert response.status_code == 200
    assert response.json == {"message": "Detail added successfully"}

    response = client.patch('/simulator-details/1', json={"topic_id": 2, "title": "AI - 2", "intro_text":"Updated Intro", "context": "Updated Context"})
    assert response.status_code == 200
    assert response.json == {"message": "Detail updated successfully!"}

    response = client.delete('/simulator-details/1')
    assert response.status_code == 200
    assert response.json == {"message": "Detail deleted successfully"}


def test_question_routes_missing_topic_id_and_question_text(client):
    response = client.post('/simulator-details', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Topic ID, introduction text, title for AI and context are required"}

    response = client.patch('/simulator-details/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Topic ID, introduction text, title for AI and context are required"}