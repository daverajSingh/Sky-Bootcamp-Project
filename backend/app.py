from flask import Flask, jsonify
import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv() # Load environment variables from .env file - UNTRACKED FOR SECURITY

app = Flask(__name__)

def create_connection(): # Create a database connection
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            database=os.getenv('DB_NAME'),
            user=os.getenv('DB_USER'),
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error: {e}")
        return None
    return None

@app.route('/get', methods=['GET'])
def get_data(): # Endpoint to fetch data from the database
    connection = create_connection()
    if connection is None:
        return jsonify({"error": "Failed to connect to database"}), 500

    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM users") # Example query
        rows = cursor.fetchall()
        return jsonify(rows)
    except Error as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to execute query"}), 500
    finally:
        cursor.close()
        connection.close()
    return None

# Add the different endpoints here - for now login

if __name__ == '__main__':
    app.run(debug=True) # Run the Flask app in debug mode

