from application.services.quiz import (get_quiz_questions,
                                       create_option,
                                       add_question_if_new,
                                       restructure_data,
                                       make_date_time_sql_compatible,
                                       insert_quiz_scores)
from collections import defaultdict

DB_ACCESS = 'application.services.quiz.DataAccess'

def test_get_quiz_questions(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'question_id': 1, 'topic_id': 1, 'option_id': 1, 
         'topic_name': 'Topic 1', 'question_text':'Topic 1 - Question 1',
         'option_text':'Option 1', 'is_correct': 0},
        {'question_id': 1,'topic_id': 1, 'option_id': 2, 
         'topic_name': 'Topic 1','question_text':'Topic 1 - Question 1',
         'option_text':'Option 2', 'is_correct': 1},
        {'question_id': 2, 'topic_id': 2, 'option_id': 1, 
         'topic_name': 'Topic 2', 'question_text':'Topic 2 Question 1',
         'option_text':'Option 1', 'is_correct': 1},
        {'question_id': 2, 'topic_id': 2, 'option_id': 2, 
         'topic_name': 'Topic 2', 'question_text':'Topic 2 Question 1',
         'option_text':'Option 2', 'is_correct': 0}
    ]

    all_questions = get_quiz_questions()

    assert len(all_questions) == 4
    assert all_questions[0]['question_text'] == 'Topic 1 - Question 1'
    assert all_questions[1]['is_correct'] == 1
    assert all_questions[2]['topic_name'] == 'Topic 2'
    assert all_questions[3]['option_text'] == 'Option 2' == 'Option 2'

def test_insert_quiz_scores(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_session_id = 1
    mock_result =  [
        {"topicID": "Topic 1", "isCorrect": 1,  },
        {"topicID": "Topic 1", "isCorrect": 0, },
        {"topicID": "Topic 2", "isCorrect": 1, },
        {"topicID": "Topic 2", "isCorrect": 1, },
    ]

    mock_instance.query.side_effect = [
        [{"topic_id": 1}],
        [{"topic_id": 2}],
    ]

    insert_quiz_scores(mock_session_id, mock_result)

    assert mock_instance.query.call_count == 2
    assert mock_instance.execute.call_count == 1
    mock_instance.execute.assert_called_once_with("INSERT INTO score (topic_id, session_id, score_value) "
                                                  "VALUES (%s, %s, %s), (%s, %s, %s)",
                                                  (1, 1, 1, 2, 1, 2))


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

def test_make_date_time_sql_compatible():
    sample_input_1 = 'Sat, 25 Oct 2025 17:46:20 GMT'
    sample_input_2 = 'Sat, 25 Oct 2025 17:50:00 GMT'

    expected_output_1 = '2025-10-25 17:46:20'
    expected_output_2 = '2025-10-25 17:50:00'

    actual_output = make_date_time_sql_compatible(sample_input_1, sample_input_2)

    assert actual_output[0] == expected_output_1
    assert actual_output[1] == expected_output_2