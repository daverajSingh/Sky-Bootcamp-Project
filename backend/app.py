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
        db.execute_file('sql_scripts/admin.sql')
        db.execute_file('sql_scripts/faq.sql')
    except Exception as e:
        print(e)

if __name__ == "__main__":
    create_table()
    app.run(debug=True, port=5000)

