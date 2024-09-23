import { API_URL } from "../consts";


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
      console.log(data);
      window.location.href = data.redirect_url;
    } else {
      throw new Error('Error al iniciar sesión con Spotify');
    }
  } catch (error) {
    console.error('Error al intentar iniciar sesión con Spotify:', error);
  }
};