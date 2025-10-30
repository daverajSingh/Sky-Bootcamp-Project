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
    mock_quiz_session_data = [
        {'question_id': 1, 'topic_id': 1, 'option_id': 1,
         'topic_name': 'Topic 1', 'question_text': 'Topic 1 - Question 1',
         'option_text': 'Option 1', 'is_correct': 0},
        {'question_id': 1, 'topic_id': 1, 'option_id': 2,
         'topic_name': 'Topic 1', 'question_text': 'Topic 1 - Question 1',
         'option_text': 'Option 2', 'is_correct': 1},
    ]

    def mock_get_quiz_questions():
        return mock_quiz_session_data

    def mock_add_quiz_session(start_time_str, end_time_str):
        return 1

    def mock_insert_quiz_scores(session_id, result):
        pass

    monkeypatch.setattr("application.routes.quiz.get_quiz_questions", mock_get_quiz_questions)
    monkeypatch.setattr("application.routes.quiz.add_quiz_session", mock_add_quiz_session)
    monkeypatch.setattr("application.routes.quiz.insert_quiz_scores", mock_insert_quiz_scores)


def test_get_all_quiz_questions_route(client, mock_services):
    response = client.get("/api/quiz")
    assert response.status_code == 200
    assert isinstance(response.json, list)
    assert "questions" in response.json[0]
    assert "topicID" in response.json[0]
    assert "questionID" in response.json[0]["questions"][0]
    assert "question" in response.json[0]["questions"][0]
    assert "options" in response.json[0]["questions"][0]
    assert "text" in response.json[0]["questions"][0]["options"][0]
    assert "is_correct" in response.json[0]["questions"][0]["options"][0]


def test_add_quiz_details(client, mock_services):
    data = {
        "start_time": "Sat, 25 Oct 2025 17:00:20 GMT",
        "end_time": "Sat, 25 Oct 2025 17:10:20 GMT",
        "result": [
            {"topicID": "Topic 1", "isCorrect": 1, },
            {"topicID": "Topic 1", "isCorrect": 0, },
            {"topicID": "Topic 2", "isCorrect": 1, },
            {"topicID": "Topic 2", "isCorrect": 1, },
        ],
      }
    response = client.post("/api/quiz", json=data)
    assert response.status_code == 200
    assert response.json == {"message": "Scores submitted successfully"}

def test_invalid_quiz_data(client, mock_services):

    response = client.post("/api/quiz", json={})
    assert response.status_code == 400

def test_invalid_quiz_routes(client, mock_services):
    response = client.delete("/api/quiz")
    assert response.status_code == 405