from fastapi import APIRouter, Header
from spotify import *
import logging
from models.TokenResponse import TokenResponse
from models.ExchangeCodeRequest import ExchangeCodeRequest

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
    

@router.post("/exchange-code", response_model=TokenResponse)
async def exchange_code(request: ExchangeCodeRequest):
    """
    Intercambia el código de autorización por un token de acceso
    @param code: Código de autorización
    @return: Token de acceso
    """
    token = await exchange_code_for_token(request.code)
    
    if token is None:
        logging.error("Error exchanging code for token")
        return {"error": "Error exchanging code for token"}

    return token

@router.get("/get-recent-tracks")
async def get_recent_tracks(Authorization: str = Header(...)):
    """
    Obtiene las canciones recientes del usuario
    @return: Canciones recientes del usuario
    """
    try:
        # si el header Authorization contiene access token lo obtenemos sino devolvemos error directo
        if Authorization.startswith("Bearer "):
            access_token = Authorization.split(" ")[1]
            
            tracks = await get_recently_played(access_token)
    
            if tracks is None:
                logging.error("Error getting recent tracks")
                return {"error": "Error getting recent tracks"}

            return tracks
        else:
            raise HTTPException(status_code=400, detail="Invalid Authorization header format")
    except Exception as e:
        logging.error(f"Error getting access token from header: {e}")
        return {"error": "Error getting access token from header"}
    