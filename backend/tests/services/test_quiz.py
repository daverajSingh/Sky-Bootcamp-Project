from application.services.quiz import get_quiz_questions

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