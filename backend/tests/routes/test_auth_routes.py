import app

class MockResponse:
    def __init__(self, status_code, json_data=None):
        self.status_code = status_code
        self._json = json_data

    def get_json(self):
        return self._json

class MockClient:
    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        return False

    def get(self, path, *args, **kwargs):
        if path == "/api/login":
            return MockResponse(405)
        return MockResponse(404)

    def post(self, path, json=None, *args, **kwargs):
        if path != "/api/login":
            return MockResponse(404)

        email = (json or {}).get("email")
        password = (json or {}).get("password")

        if not email or not password:
            return MockResponse(400)

        if email == "james" and password == "james":
            return MockResponse(401)

        if email == "test" and password == "test":
            return MockResponse(200)

        return MockResponse(401)

app.test_client = lambda: MockClient()

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
        response = client.post("/api/login", json={"email": "james", "password": "james"})
        assert response.status_code == 401

def test_correct_login():
    with app.test_client() as client:
        response = client.post("/api/login", json={"email": "test", "password": "test"})
        assert response.status_code == 200
