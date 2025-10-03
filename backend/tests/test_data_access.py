import pytest
from backend.application.data_access import DataAccess

@pytest.fixture
def mock_db(mocker):
    mock_conn = mocker.MagicMock()
    mock_cursor = mocker.MagicMock()
    mock_conn.cursor.return_value = mock_cursor
    mock_conn.open = True
    mocker.patch("backend.application.data_access.pymysql.connect", return_value=mock_conn)
    return mock_conn, mock_cursor


def test_query(mock_db):
    _, mock_cursor = mock_db
    mock_cursor.fetchall.return_value = [{"admin_id": 1, "name": "test"}]
    db = DataAccess()
    result = db.query("SELECT * FROM users")
    assert result == [{"admin_id": 1, "name": "test"}]
    mock_cursor.execute.assert_called_once_with("SELECT * FROM users", None)

def test_execute(mock_db):
    _, mock_cursor = mock_db
    db = DataAccess()
    db.execute("INSERT INTO users (name) VALUES (%s)", ("test",))
    mock_cursor.execute.assert_called_once_with(
        "INSERT INTO users (name) VALUES (%s)", ("test",)
    )


