import os
from dotenv import load_dotenv
import httpx
from fastapi import HTTPException
import logging
from models.TokenResponse import TokenResponse

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def get_spotify_credentials():
    """función para obtener las credenciales de Spotify."""
    load_dotenv()
    SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
    SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")
    SPOTIFY_REDIRECT_URI = os.getenv("SPOTIFY_REDIRECT_URI")
    SPOTIFY_AUTH_URL = os.getenv("SPOTIFY_AUTH_URL")
    SPOTIFY_TOKEN_URL = os.getenv("SPOTIFY_TOKEN_URL")
    TOKEN_URL = os.getenv("TOKEN_URL")
    return SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI,SPOTIFY_AUTH_URL, SPOTIFY_TOKEN_URL, TOKEN_URL

SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI,SPOTIFY_AUTH_URL, SPOTIFY_TOKEN_URL, TOKEN_URL = get_spotify_credentials()

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

    redirect_url = (
        f"{SPOTIFY_AUTH_URL}?client_id={SPOTIFY_CLIENT_ID}"
        f"&response_type=code&redirect_uri={SPOTIFY_REDIRECT_URI}"
        f"&scope={scope}&show_dialog=true"
    )
    return {"redirect_url": redirect_url}


async def exchange_code_for_token(code: str) -> TokenResponse:
    """Función para intercambiar el código de autorización por un token de acceso.
    @param code: Código de autorización.
    @return: Token de acceso.
    """
    
    # Configuración de la carga útil de la solicitud POST
    payload = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": SPOTIFY_REDIRECT_URI,
        "client_id": SPOTIFY_CLIENT_ID,
        "client_secret": SPOTIFY_CLIENT_SECRET,
    }
    
    try:
        # Intercambio de código por token a través de una solicitud POST
        async with httpx.AsyncClient() as client:
            response = await client.post(TOKEN_URL, data=payload)
        
        # Si la solicitud no fue exitosa
        if response.status_code != 200:
            logging.error(response.json())
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        # Si todo está bien, se devuelve el acceso token configurado en el modelo TokenResponse
        token_data = response.json()
        logging.info(f"Token data: {token_data}")
        return TokenResponse(
            access_token=token_data["access_token"],
            refresh_token=token_data.get("refresh_token"),  # Puede no estar presente
            expires_in=token_data["expires_in"],
            token_type=token_data["token_type"]
        )
        
    except Exception as e:
        logging.error(f"Error exchanging code for token: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


async def get_recently_played(access_token: str):
    """Función para obtener las canciones recientes del usuario.
    @param access_token: Token de acceso.
    @return: Canciones recientes del usuario.
    """
    try:
        logging.info("Getting recent tracks" + access_token)
        url = "https://api.spotify.com/v1/me/player/recently-played"
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        params = {
            "limit": 50
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers, params=params)
            
        # Si la solicitud no fue exitosa se lanza una excepción
        if response.status_code != 200:
            logging.error(response.json())
            raise HTTPException(status_code=response.status_code, detail=response.json())
        
        logging.info(f"Recent tracks: {response.json()}")
        return response.json()
    except Exception as e:
        logging.error(f"Error getting recent tracks: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
async def get_top_artists_and_tracks(access_token: str, limit: int = 50):
    """Obtener los artistas y canciones más escuchados del usuario.
    @param access_token: Token de acceso.
    @param limit: Número total de artistas y canciones a obtener (máximo 50).
    @return: Un diccionario con los artistas y canciones más escuchados.
    """
    try:
        # URLs de los endpoints
        artists_url = "https://api.spotify.com/v1/me/top/artists"
        tracks_url = "https://api.spotify.com/v1/me/top/tracks"
        headers = {
            "Authorization": f"Bearer {access_token}"
        }

        # Obtener artistas más escuchados
        artists_params = {
            "limit": limit,
            "time_range": "short_term"  # Cambia esto según tus necesidades
        }
        async with httpx.AsyncClient() as client:
            artists_response = await client.get(artists_url, headers=headers, params=artists_params)

            if artists_response.status_code != 200:
                logging.error(f"Error getting top artists: {artists_response.json()}")
                raise HTTPException(status_code=artists_response.status_code, detail=artists_response.json())

            top_artists = artists_response.json().get('items', [])
            artists_list = [{"name": artist['name'], "id": artist['id']} for artist in top_artists]

        # Obtener canciones más escuchadas
        tracks_params = {
            "limit": limit,
            "time_range": "short_term"  # Cambia esto según tus necesidades
        }
        async with httpx.AsyncClient() as client:
            tracks_response = await client.get(tracks_url, headers=headers, params=tracks_params)

            if tracks_response.status_code != 200:
                logging.error(f"Error getting top tracks: {tracks_response.json()}")
                raise HTTPException(status_code=tracks_response.status_code, detail=tracks_response.json())

            top_tracks = tracks_response.json().get('items', [])
            tracks_list = [{"name": track['name'], "id": track['id'], "artists": [artist['name'] for artist in track['artists']]} for track in top_tracks]

        # Devolver resultados
        return {
            "top_artists": artists_list,
            "top_tracks": tracks_list
        }

    except Exception as e:
        logging.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
    