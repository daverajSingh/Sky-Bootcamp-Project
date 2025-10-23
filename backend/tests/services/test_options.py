from application.services.options import get_options, get_options_by_question_id, add_option, delete_option, update_option
import pymysql

DB_ACCESS = 'application.services.options.DataAccess'

def test_get_options(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'option_id': 1, 'question_id': 1, 'option_text' : 'Q1 Option 1', 'is_correct': 1},
        {'option_id': 2, 'question_id': 1, 'option_text' : 'Q1 Option 2', 'is_correct': 0},
        {'option_id': 3, 'question_id': 2, 'option_text' : 'Q2 Option 1', 'is_correct': 0},
        {'option_id': 4, 'question_id': 2, 'option_text' : 'Q2 Option 2', 'is_correct': 1}
    ]

    options = get_options()
    assert len(options) == 4
    assert options[0]['option_text'] == 'Q1 Option 1'
    assert options[1]['option_text'] == 'Q1 Option 2'
    assert options[2]['option_text'] == 'Q2 Option 1'
    assert options[3]['option_text'] == 'Q2 Option 2'


def test_options_by_question_id(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    mock_instance.query.return_value = [
        {'option_id': 1, 'question_id': 1, 'option_text' : 'Q1 Option 1', 'is_correct': 1},
        {'option_id': 2, 'question_id': 1, 'option_text' : 'Q1 Option 2', 'is_correct': 0},
    ]

    options = get_options_by_question_id(1)
    assert len(options) == 2
    assert options[0]['option_text'] == 'Q1 Option 1'
    assert options[1]['option_text'] == 'Q1 Option 2'


def test_add_option(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    add_option(1, "New Option", 0)
    mock_instance.execute.assert_called_once_with("INSERT INTO options (question_id, option_text, is_correct) VALUES (%s, %s, %s)", (1, "New Option", 0))

def test_delete_option(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    delete_option(1)
    mock_instance.execute.assert_called_once_with("DELETE FROM options WHERE option_id = (%s)", 1)

def test_update_option(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value

    update_option(1, "Updated Option", 0)
    mock_instance.execute.assert_called_once_with("UPDATE options SET option_text = (%s), is_correct=(%s) WHERE option_id = (%s)", ("Updated Option", 0, 1))

def test_add_option_db_error(mocker):
    mock_db = mocker.patch(DB_ACCESS)
    mock_instance = mock_db.return_value
    mock_instance.execute.side_effect = pymysql.MySQLError("DB Error")

    try:
        add_option(1, "New Option", 0)
    except RuntimeError as e:
        assert str(e) == "Database query error: DB Error"