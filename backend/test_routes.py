from backend import app

def test_login_get():
    with app.test_client() as client:
        response = client.get("/api/login")
        assert response.status_code == 405

def test_login_post():
    with app.test_client() as client:
        response = client.post("/api/login", json={"email": "", "password": ""})
        assert response.status_code == 400

def test_incorrect_login():
    with app.test_client() as client:
        response = client.get("/api/login", json={"email": "james", "password": "james"})

def test_correct_login():
    with app.test_client() as client:
        response = client.get("/api/login", json={"email": "test", "password": "test"})
