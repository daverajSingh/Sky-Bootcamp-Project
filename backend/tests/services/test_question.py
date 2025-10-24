from application.services.question import get_questions, get_questions_by_topic_id, add_question, delete_question, update_question
import pymysql

DB_ACCESS = 'application.services.question.DataAccess'

def test_get_questions(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'question_id': 1, 'topic_id': 1, 'question_text':'Topic 1 - Question 1'},
        {'question_id': 2, 'topic_id': 2, 'question_text':'Topic 2 Question 1'}
    ]

    questions = get_questions()
    assert len(questions) == 2
    assert questions[0]['question_text'] == 'Topic 1 - Question 1'
    assert questions[1]['question_text'] == 'Topic 2 Question 1'

def test_get_questions_by_topic_id(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
       {'question_id': 1, 'topic_id': 1, 'question_text':'Topic 1 Question 1'},
       {'question_id': 2, 'topic_id': 1, 'question_text':'Topic 1 Question 2'}
    ]

    question = get_questions_by_topic_id(1)
    assert len(question) == 2
    assert question[0]['question_text'] == 'Topic 1 Question 1'
    assert question[1]['question_text'] == 'Topic 1 Question 2'

def test_add_question(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    add_question(1, "New Question")
    mock_instance.execute.assert_called_once_with("INSERT INTO question (topic_id, question_text) VALUES (%s, %s)", (1, 'New Question'))

def test_delete_question(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    delete_question(1)
    mock_instance.execute.assert_called_once_with("DELETE FROM question WHERE question_id = (%s)", 1)

def test_update_question(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    update_question(1, 'Updated Question')
    mock_instance.execute.assert_called_once_with("UPDATE question SET question_text = (%s) WHERE question_id = (%s)", ('Updated Question', 1))

def test_update_question_db_error(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    mock_instance.execute.side_effect = pymysql.MySQLError("DB Error")

    try:
        update_question(1, 'Update Question')
    except RuntimeError as e:
        assert str(e) == "Database query error: DB Error"
