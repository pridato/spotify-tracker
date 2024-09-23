import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv

def get_spotify_client():
    """Función para obtener los datos del cliente de Spotify a través de un .env."""
    load_dotenv()
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

def authenticate_and_get_data(code):
    """Función para autenticar y obtener los datos del usuario usando el código."""
    sp = SpotifyOAuth(client_id=os.getenv("SPOTIPY_CLIENT_ID"),
                      client_secret=os.getenv("SPOTIPY_CLIENT_SECRET"),
                      redirect_uri=os.getenv("SPOTIPY_REDIRECT_URI"),
                      scope="user-library-read user-read-recently-played")

    # Obtiene el token de acceso usando el código
    token_info = sp.get_access_token(code)

    if token_info:
        sp = spotipy.Spotify(auth=token_info['access_token'])
        user_info = sp.current_user()
        recent_tracks = get_recent_tracks()
        return {
            'access_token': token_info['access_token'],
            'user': user_info,
            'recent_tracks': recent_tracks,
        }
    else:
        return None
