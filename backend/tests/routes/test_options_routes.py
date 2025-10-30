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

    def mock_get_options():
        return [
            {'option_id': 1, 'option_text': 'Q1 - Option 1', 'is_correct': 1, 'question_id': 1},
            {'option_id': 2, 'option_text': 'Q1 - Option 2', 'is_correct': 0, 'question_id': 1},
            {'option_id': 3, 'option_text': 'Q2 - Option 1', 'is_correct': 0, 'question_id': 2},
            {'option_id': 4, 'option_text': 'Q2 - Option 2', 'is_correct': 1, 'question_id': 2}
        ]

    monkeypatch.setattr("application.routes.options.get_options", mock_get_options)
    monkeypatch.setattr("application.routes.options.add_option", mock_execute_queries)
    monkeypatch.setattr("application.routes.options.update_option", mock_execute_queries)
    monkeypatch.setattr("application.routes.options.delete_option", mock_execute_queries)

def test_option_routes(client, mock_services):
    response = client.get('/options')
    assert response.status_code == 200
    assert response.json == [
        {'option_id': 1, 'option_text': 'Q1 - Option 1', 'is_correct': 1, 'question_id': 1},
        {'option_id': 2, 'option_text': 'Q1 - Option 2', 'is_correct': 0, 'question_id': 1},
        {'option_id': 3, 'option_text': 'Q2 - Option 1', 'is_correct': 0, 'question_id': 2},
        {'option_id': 4, 'option_text': 'Q2 - Option 2', 'is_correct': 1, 'question_id': 2}
    ]

    response = client.post('/options', json={'question_id': 1, 'option_text': 'New Option', 'is_correct': 0})
    assert response.status_code == 200
    assert response.json == {"message": "Option added successfully"}

    response = client.patch('/option/1', json={'option_text': 'Updated Option', 'is_correct': 1})
    assert response.status_code == 200
    assert response.json == {"message": "Option updated successfully!"}

    response = client.delete('/option/1')
    assert response.status_code == 200
    assert response.json == {"message": "Option deleted successfully"}

def test_option_routes_missing_option_details_and_question_id(client):
    response = client.post('/options', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Question ID, option text and is_correct are required"}

    response = client.patch('/option/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Option text and is_correct are required"}
