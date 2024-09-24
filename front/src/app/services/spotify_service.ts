import { API_URL } from "../consts";

let exchangedToken: boolean = false;

/**
 * Obtiene la URL de redirección para iniciar sesión con Spotify
 * @returns {Promise<string>} URL de redirección
 */
export const loginWithSpotify = async () => {
  try {
    const response = await fetch(`${API_URL}/get-redirect-url`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = data.redirect_url;
      
    } else {
      throw new Error('Error al iniciar sesión con Spotify');
    }
  } catch (error) {
    console.error('Error al intentar iniciar sesión con Spotify:', error);
  }
};

/**
 * metodo para intercambiar el código por el token
 * @param code codigo generado por spotify
 * @returns {Promise<any>} token de acceso
 */
export const exchangeCodeForToken = async (code: string) => {
  if(exchangedToken) return

  try {
    exchangedToken = true;
    const response = await fetch(`${API_URL}/exchange-code`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error al intercambiar código por token');
    }
  } catch (error) {
    console.error('Error al intentar intercambiar código por token:', error);
  }
}