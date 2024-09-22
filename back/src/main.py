from fastapi import FastAPI
from api.spotify_routes import router as spotify_router

app = FastAPI()

app.include_router(spotify_router)