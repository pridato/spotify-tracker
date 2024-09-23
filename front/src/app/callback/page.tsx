"use client";
import { useEffect } from "react";

export default function CallbackPage() {

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      localStorage.setItem('code', code);
      setTimeout(() => {
        window.close();
      }, 5000);
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>¡Autenticación Exitosa!</h1>
      <p>Puedes cerrar la ventana.</p>
      <p>Redirigiendo en 5 segundos...</p>
    </div>
  );
}
