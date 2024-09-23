/**
 * funcion para abrir como popup una url
 * @param url 
 */
export function openPopup(url:string) {
  const width = 600;
  const height = 600;
  const left = (window.innerWidth / 2) - (width / 2);
  const top = (window.innerHeight / 2) - (height / 2);
  window.open(url, 'Spotify Login', `width=${width},height=${height},top=${top},left=${left}`);
}
