from application.data_access import DataAccess
import pymysql

def get_options():
    db = DataAccess()
    try:
        options = db.query("SELECT option_id, question_id, option_text, is_correct FROM options")
        return options
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def get_options_by_question_id(question_id):
    db = DataAccess()
    try:
        option = db.query("SELECT option_id, option_text, is_correct FROM options WHERE question_id = (%s)", question_id)
        return option
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def add_option(question_id, option, is_correct):
    db = DataAccess()
    try:
        db.execute("INSERT INTO options (question_id, option_text, is_correct) VALUES (%s, %s, %s)", (question_id, option, is_correct))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')

def delete_option(id):
    db = DataAccess()
    try:
        db.execute("DELETE FROM options WHERE option_id = (%s)", id)
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')


def update_option(id, option, is_correct):
    db = DataAccess()
    try:
        db.execute("UPDATE options SET option_text = (%s), is_correct=(%s) WHERE option_id = (%s)", (option, is_correct, id))
    except pymysql.MySQLError as e:
        raise RuntimeError(f'Database query error: {e}')
    
