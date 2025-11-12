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

    def mock_add_question(*args, **kwargs):
        return 1

    def mock_get_questions():
        return [{'question_id': 1, 'question_text': 'Question 1', 'topic_id': 1},
                {'question_id': 2, 'question_text': 'Question 2', 'topic_id': 2}]


    def mock_get_options_by_question_id(question_id):
        return [
            {'option_id': 1, 'option_text': 'Q1 - Option 1', 'is_correct': 1},
            {'option_id': 2, 'option_text': 'Q1 - Option 2', 'is_correct': 0}
        ]

    monkeypatch.setattr("application.routes.question.get_questions", mock_get_questions)
    monkeypatch.setattr("application.routes.question.add_question", mock_add_question)
    monkeypatch.setattr("application.routes.question.update_question", mock_execute_queries)
    monkeypatch.setattr("application.routes.question.delete_question", mock_execute_queries)
    monkeypatch.setattr("application.routes.question.get_options_by_question_id", mock_get_options_by_question_id)

def test_question_routes(client, mock_services):
    response = client.get('/questions')
    assert response.status_code == 200
    assert response.json == [{'question_id': 1, 'question_text': 'Question 1', 'topic_id': 1}, {'question_id': 2, 'question_text': 'Question 2', 'topic_id': 2}]

    response = client.post('/questions', json={'topic_id': 1, 'question_text': 'New Question'})
    assert response.status_code == 200
    assert response.json == {"message": "Question added successfully with ID:1"}

    response = client.patch('/question/1', json={'question_text': 'Updated Question'})
    assert response.status_code == 200
    assert response.json == {"message": "Question updated successfully!"}

    response = client.delete('/question/1')
    assert response.status_code == 200
    assert response.json == {"message": "Question deleted successfully"}

    response = client.get('/question/1/options')
    assert response.status_code == 200
    assert response.json == [
        {'option_id': 1, 'option_text': 'Q1 - Option 1', 'is_correct': 1},
        {'option_id': 2, 'option_text': 'Q1 - Option 2', 'is_correct': 0}
    ]

def test_question_routes_missing_topic_id_and_question_text(client):
    response = client.post('/questions', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Topic ID and question text are required"}

    response = client.patch('/question/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Question text is required"}