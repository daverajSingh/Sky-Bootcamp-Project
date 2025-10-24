from application.routes.quiz import create_option, add_question_if_new, restructure_data
from collections import defaultdict
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
    mock_data = sample_input = [
        {'question_id': 1, 'topic_id': 1, 'option_id': 1,
         'topic_name': 'Topic 1', 'question_text': 'Topic 1 - Question 1',
         'option_text': 'Option 1', 'is_correct': 0},
        {'question_id': 1, 'topic_id': 1, 'option_id': 2,
         'topic_name': 'Topic 1', 'question_text': 'Topic 1 - Question 1',
         'option_text': 'Option 2', 'is_correct': 1},
    ]

    def mock_get_quiz_questions():
        return mock_data

    monkeypatch.setattr("application.routes.quiz.get_quiz_questions", mock_get_quiz_questions)

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



def test_create_options():
    sample_input = [
        {"option_text":"Option 1", "is_correct": "0"},
        {"option_text":"Option 2", "is_correct": "1"}
    ]
    expected_output = {
        "text": "Option 2","is_correct": True
    }

    actual_output = create_option(sample_input[1])

    assert actual_output == expected_output

def test_add_questions_if_new():
    sample_input = [
        {'question_id': 1, 'topic_id': 1, 'option_id': 1,
         'topic_name': 'Topic 1', 'question_text': 'Topic 1 - Question 1',
         'option_text': 'Option 1', 'is_correct': 0},
        {'question_id': 1, 'topic_id': 1, 'option_id': 2,
         'topic_name': 'Topic 1', 'question_text': 'Topic 1 - Question 1',
         'option_text': 'Option 2', 'is_correct': 1},
    ]
    expected_output = {
        "Topic 1" : {
             "questions": [
                {
                    "options": [
                        {
                            "is_correct": False,
                            "text": "Option 1"
                        }
                    ],
                    "question": "Topic 1 - Question 1",
                    "questionID": 1
                }
             ]
        }
    }

    actual_output = defaultdict(lambda: {"questions": []})
    add_question_if_new(actual_output[sample_input[0]["topic_name"]]["questions"], sample_input[0])

    assert actual_output == expected_output

def test_restructure_data():
    sample_input = [
        {'question_id': 1, 'topic_id': 1, 'option_id': 1,
         'topic_name': 'Topic 1', 'question_text': 'Topic 1 - Question 1',
         'option_text': 'Option 1', 'is_correct': 0},
        {'question_id': 1, 'topic_id': 1, 'option_id': 2,
         'topic_name': 'Topic 1', 'question_text': 'Topic 1 - Question 1',
         'option_text': 'Option 2', 'is_correct': 1},
    ]

    expected_output = [
        {
            "topicID": "Topic 1",
            "questions": [
                    {
                        "options": [
                            {
                                "is_correct": False,
                                "text": "Option 1"
                            },
                            {
                                "is_correct": True,
                                "text": "Option 2"
                            }
                        ],
                        "question": "Topic 1 - Question 1",
                        "questionID": 1
                    }
            ]
        }
    ]

    actual_output = restructure_data(sample_input)
    assert actual_output == expected_output








