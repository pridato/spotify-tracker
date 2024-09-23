import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv


def get_spotify_client():
    """Función para obtener los datos del cliente de Spotify a través de un .env."""
    
    os.environ["SPOTIPY_CLIENT_ID"] = os.getenv("SPOTIPY_CLIENT_ID")
    os.environ["SPOTIPY_CLIENT_SECRET"] = os.getenv("SPOTIPY_CLIENT_SECRET")
    os.environ["SPOTIPY_REDIRECT_URI"] = os.getenv("SPOTIPY_REDIRECT_URI")
    return spotipy.Spotify(auth_manager=SpotifyOAuth(
        scope="user-library-read user-read-recently-played",
        redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
    ))

def get_recent_tracks():
    """Función para obtener las canciones del usuario que ha escuchado recientemente."""
    sp = get_spotify_client()

    results = sp.current_user_recently_played(limit=30)
    tracks = []

    for item in results['items']:
        track_info = {
            'name': item['track']['name'],
            'artist': item['track']['artists'][0]['name'],
            'uri': item['track']['uri'],
            'played_at': item['played_at'],
        }
        tracks.append(track_info)

    return tracks

def get_redirect():
    """
    Función para obtener la URL de redirección de Spotify.
    @return: URL de redirección de Spotify.
    """
    scope = (
        "user-read-private "
        "user-read-email "
        "user-library-read "
        "user-read-playback-state "
        "user-read-currently-playing "
        "playlist-read-private "
        "playlist-modify-private "
        "user-read-recently-played "
        "user-top-read"
    )
    
    load_dotenv()
    SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
    # SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
    SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")

    SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
    # SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"

    redirect_url = (
        f"{SPOTIFY_AUTH_URL}?client_id={SPOTIFY_CLIENT_ID}"
        f"&response_type=code&redirect_uri={SPOTIFY_REDIRECT_URI}"
        f"&scope={scope}&show_dialog=true"
    )
    return {"redirect_url": redirect_url}