from fastapi import APIRouter, Depends
from spotify import get_spotify_client, get_recent_tracks

router = APIRouter()

@router.get("/login")
async def login():
    client = get_spotify_client()
    """Endpoint para redirigir al usuario a la URL de login de Spotify."""
    return {"client": client.current_user_playing_track()}

@router.get("/callback")
async def callback():
    """Endpoint para manejar la redirección después del login de Spotify."""
    return {"message": "Usuario autenticado. Puedes obtener tus pistas recientes."}

@router.get("/recent-tracks")
async def recent_tracks(tracks: dict = Depends(get_recent_tracks)):
    """Endpoint para obtener las canciones recientes del usuario."""
    return tracks