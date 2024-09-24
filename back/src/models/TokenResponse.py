from pydantic import BaseModel

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str = None
    expires_in: int
    token_type: str