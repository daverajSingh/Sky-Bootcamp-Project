from flask import Flask
from flask_cors import CORS
from application.data_access import DataAccess
from application.routes import routes

app = Flask(__name__)
CORS(app)
app.register_blueprint(routes)

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
        """
        db.execute(query)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    create_table()
    app.run(debug=True, port=5000)