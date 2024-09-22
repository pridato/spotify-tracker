import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv


def get_spotify_client():
    """Función para obtener los datos del cliente de spotify a través de un .env
    @return: usuario logueado
    """
    load_dotenv()
    os.environ["SPOTIPY_CLIENT_ID"] = os.getenv("SPOTIPY_CLIENT_ID")
    os.environ["SPOTIPY_CLIENT_SECRET"] = os.getenv("SPOTIPY_CLIENT_SECRET")
    os.environ["SPOTIPY_REDIRECT_URI"] = os.getenv("SPOTIPY_REDIRECT_URI")
    return spotipy.Spotify(auth_manager=SpotifyOAuth(scope="user-library-read user-read-recently-played"))


def get_recent_tracks():
    """Función para obtener las canciones del usuario que ha escuchado recientemente
    @return: Lista de diccionarios con información sobre cada pista.
    """
    sp = get_spotify_client()

    results = sp.current_user_recently_played(limit=30)
    tracks = []

    for item in results['items']:
        track_info = {
            'name': item['track']['name'],  # Nombre de la canción
            'artist': item['track']['artists'][0]['name'],  # Nombre del artista
            'uri': item['track']['uri'],  # URI de la pista en Spotify
            'played_at': item['played_at'],  # Fecha y hora en que se reprodujo
        }
        tracks.append(track_info)
