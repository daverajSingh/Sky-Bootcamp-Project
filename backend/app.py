from backend import app, create_table

if __name__ == "__main__":
    create_table()
    app.run(debug=True, port=5000)