from fastapi import APIRouter, Depends
from spotify import get_recent_tracks

router = APIRouter()

@router.get("/login")
async def login():
    """Endpoint para redirigir al usuario a la URL de login de Spotify."""
    return {"message": "Redirige al usuario a la URL de login de Spotify."}

@router.get("/callback")
async def callback():
    """Endpoint para manejar la redirección después del login de Spotify."""
    return {"message": "Usuario autenticado. Puedes obtener tus pistas recientes."}

@router.get("/recent-tracks")
async def recent_tracks(tracks: dict = Depends(get_recent_tracks)):
    """Endpoint para obtener las canciones recientes del usuario."""
    return tracks