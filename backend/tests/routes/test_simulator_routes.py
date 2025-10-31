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

    def mock_get_ai_response_for_user_input():
        return { "text": "AI's response to user input"}

    def mock_ai_dialogue(user_input, context):
        return  "AI's response to user input"

    monkeypatch.setattr("application.routes.simulator.get_ai_response_for_user_input", mock_get_ai_response_for_user_input)
    monkeypatch.setattr("application.routes.simulator.dialogue", mock_ai_dialogue)

def test_question_routes(client, mock_services):

    response = client.post('api/simulator/1', json={"text": "User input", "context": "Topic's Context"})
    assert response.status_code == 200
    assert response.json == {"text": "AI's response to user input"}


def test_question_routes_missing_topic_id_and_question_text(client):
    response = client.post('api/simulator/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "text and context are required"}