from fastapi import FastAPI
from api.spotify_routes import router as spotify_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)

app.include_router(spotify_router)

uvicorn.run(app, host="0.0.0.0", port=500)