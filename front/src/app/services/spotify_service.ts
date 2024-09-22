import { API_URL } from "../consts";


export const loginWithSpotify = async () => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data
    } else {
      throw new Error('Error al iniciar sesión con Spotify');
    }
  } catch (error) {
    console.error('Error al intentar iniciar sesión con Spotify:', error);
    throw error; 
  }
};