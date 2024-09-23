from fastapi import APIRouter, Depends
from spotify import *
from flask import Flask, request, redirect
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
router = APIRouter()

@router.get("/get-redirect-url")
def get_redirect_url():
    """
    Devuelve la URL a la que debe redirigir el frontend para el inicio de sesión de Spotify
    @return: URL de redirección de Spotify
    """
    url = get_redirect()
    
    if url is None:
        logging.error("Spotify credentials not found")
        return {"error": "Spotify credentials not found"}

    logging.info(f"Redirect URL: {url}")
    return url
    

@router.get("/login")
async def login():
    client = get_spotify_client()
    """Endpoint para redirigir al usuario a la URL de login de Spotify."""
    return {"client": client.current_user_playing_track()}

@router.get("/recent-tracks")
async def recent_tracks(tracks: dict = Depends(get_recent_tracks)):
    """Endpoint para obtener las canciones recientes del usuario."""
    return tracks