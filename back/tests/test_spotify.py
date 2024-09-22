from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)

def test_login():
    response = client.get("/login")
    assert response.status_code == 200
    assert "Redirige al usuario" in response.json().get("message")

def test_callback():
    response = client.get("/callback")
    assert response.status_code == 200
    assert "Usuario autenticado" in response.json().get("message")

def test_recent_tracks():
    response = client.get("/recent-tracks")
    assert response.status_code == 200
    assert "tracks" in response.json()
