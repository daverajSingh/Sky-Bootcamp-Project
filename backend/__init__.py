from flask import Flask
from backend.application.data_access import DataAccess

app = Flask(__name__)

def create_table():
    db = DataAccess()
    try:
        query = """
        CREATE TABLE IF NOT EXISTS admin (
        `admin_id` int PRIMARY KEY NOT NULL auto_increment, 
        `admin_email` varchar(255) NOT NULL, 
        `admin_password` varchar(255) NOT NULL, 
        `admin_name` varchar(50) NOT NULL
        );
        CREATE TABLE IF NOT EXISTS topic (
        `topic_id` int PRIMARY KEY NOT NULL auto_increment,
        `topic_name` varchar(255) NOT NULL);
        """
        db.execute(query)
    except Exception as e:
        print(e)


from backend.application import routes
