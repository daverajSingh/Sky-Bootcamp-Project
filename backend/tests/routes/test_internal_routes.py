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

    def mock_get_questions():
        return [{'question_id': 1, 'question_text': 'Question 1', 'topic_id': 1}, {'question_id': 2, 'question_text': 'Question 2', 'topic_id': 2}]
    
    def mock_get_questions_by_topic_id(topic_id):
        return [{'question_id': 1, 'question_text': 'Question 1'}]

    def mock_get_options():
        return [
            {'option_id': 1, 'option_text': 'Q1 - Option 1', 'is_correct': 1, 'question_id': 1}, 
            {'option_id': 2, 'option_text': 'Q1 - Option 2', 'is_correct': 0, 'question_id': 1},
            {'option_id': 3, 'option_text': 'Q2 - Option 1', 'is_correct': 0, 'question_id': 2},
            {'option_id': 4, 'option_text': 'Q2 - Option 2', 'is_correct': 1, 'question_id': 2}
        ]
    
    def mock_get_options_by_question_id(question_id):
        return [
            {'option_id': 1, 'option_text': 'Q1 - Option 1', 'is_correct': 1}, 
            {'option_id': 2, 'option_text': 'Q1 - Option 2', 'is_correct': 0}
        ]

    monkeypatch.setattr("application.routes.internal.get_topics", mock_get_topics)
    monkeypatch.setattr("application.routes.internal.add_topic", mock_execute_queries)
    monkeypatch.setattr("application.routes.internal.update_topic", mock_execute_queries)
    monkeypatch.setattr("application.routes.internal.delete_topic", mock_execute_queries)
    monkeypatch.setattr("application.routes.internal.get_questions", mock_get_questions)
    monkeypatch.setattr("application.routes.internal.add_question", mock_execute_queries)
    monkeypatch.setattr("application.routes.internal.update_question", mock_execute_queries)
    monkeypatch.setattr("application.routes.internal.delete_question", mock_execute_queries)
    monkeypatch.setattr("application.routes.internal.get_questions_by_topic_id", mock_get_questions_by_topic_id)
    monkeypatch.setattr("application.routes.internal.get_options", mock_get_options)
    monkeypatch.setattr("application.routes.internal.add_option", mock_execute_queries)
    monkeypatch.setattr("application.routes.internal.update_option", mock_execute_queries)
    monkeypatch.setattr("application.routes.internal.delete_option", mock_execute_queries)
    monkeypatch.setattr("application.routes.internal.get_options_by_question_id", mock_get_options_by_question_id)

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

def test_topics_routes_missing_topic_name(client):
    response = client.post('/topics', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Topic name is required"}

    response = client.patch('/topic/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Topic name is required"}

def test_question_routes(client, mock_services):
    response = client.get('/questions')
    assert response.status_code == 200
    assert response.json == [{'question_id': 1, 'question_text': 'Question 1', 'topic_id': 1}, {'question_id': 2, 'question_text': 'Question 2', 'topic_id': 2}]

    response = client.post('/questions', json={'topic_id': 1, 'question_text': 'New Question'})
    assert response.status_code == 200
    assert response.json == {"message": "Question added successfully"}

    response = client.patch('/question/1', json={'question_text': 'Updated Question'})
    assert response.status_code == 200
    assert response.json == {"message": "Question updated successfully!"}

    response = client.delete('/question/1')
    assert response.status_code == 200
    assert response.json == {"message": "Question deleted successfully"}

    response = client.get('/topic/1/questions')
    assert response.status_code == 200
    assert response.json == [{'question_id': 1, 'question_text': 'Question 1'}]


def test_question_routes_missing_topic_id_and_question_text(client):
    response = client.post('/questions', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Topic ID and question text are required"}

    response = client.patch('/question/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Question text is required"}

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

    response = client.get('/question/1/options')
    assert response.status_code == 200
    assert response.json == [
        {'option_id': 1, 'option_text': 'Q1 - Option 1', 'is_correct': 1}, 
        {'option_id': 2, 'option_text': 'Q1 - Option 2', 'is_correct': 0}
    ]

def test_option_routes_missing_option_details_and_question_id(client):
    response = client.post('/options', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Question ID, option text and is_correct are required"}

    response = client.patch('/option/1', json={})
    assert response.status_code == 400
    assert response.json == {"error": "Option text and is_correct are required"}