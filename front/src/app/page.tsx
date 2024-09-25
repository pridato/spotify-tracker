"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  exchangeCodeForToken,
  getUserRecentTracks,
  loginWithSpotify,
} from "./services/spotify_service";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RecentlyPlayedResponse } from "./models/RecentlyPlayedResponse";
import { RecentlyPlayedItem } from "./models/RecentlyPlayedItem";
import { Track } from "./models/Track";
import SongBarChart from "./components/SongBarChart";
import { AccessToken } from "./models/AccessToken";

export default function Home() {
  const toast = useToast();
  const status = "error";
  const [recentTracks, setRecentTracks] =
    useState<RecentlyPlayedResponse | null>(null);
  const [token, setToken] = useState<AccessToken | null>(null);

  useEffect(() => {
    // lo obtenemos de user_storage.ts
    const fetchData = async () => {
      try {
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        const token = JSON.parse(localStorage.getItem("token") || "{}");

        // Si hay código, se ha logueado con éxito, devolver el code al back
        if (code && !token) {
          setToken(await exchangeCodeForToken(code));
        }

        if (token) {
          // obtener todas las canciones, activar spinner
          const data = await getUserRecentTracks(token.access_token);
          setRecentTracks(data);
          localStorage.setItem("token", JSON.stringify(token));
          window.history.pushState({}, document.title, "/");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        return;
      } finally {
      }
    };

    fetchData();
  }, [toast, token]);

  const songCounts = recentTracks?.items.reduce<
    Record<string, { track: Track; count: number }>
  >((acc, current: RecentlyPlayedItem) => {
    const trackName = current.track.name;
    if (!acc[trackName]) {
      acc[trackName] = { track: current.track, count: 1 };
    } else {
      acc[trackName].count += 1;
    }
    return acc;
  }, {} as Record<string, { track: Track; count: number }>);

  // Convertir el objeto a un array y ordenar por el conteo
  const formattedData = songCounts
    ? Object.values(songCounts).slice(0, 25) // Tomar solo las 25 primeras
    : [];


  // formattedData ahora contendrá las 25 canciones más escuchadas

  async function handleLoginWithSpotify() {
    try {
      await loginWithSpotify();
    } catch (error) {
      toast({
        title: `${status} toast ${error}`,
        description: "Error al intentar iniciar sesión con Spotify",
        status: status,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <div className="h-screen px-4 pb-24 md:px-6">
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
        Bienvenido usuario de Spotify
      </h1>
      <h2 className="text-gray-400 text-md pb-4 mt-2">Que deseas hacer hoy?</h2>

      {/* Chart especie de separador */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center px-4 py-2 text-gray-400 border border-gray-300 rounded-r-full rounded-tl-sm rounded-bl-full text-md">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="mr-2 text-gray-400"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M192 1664h288v-288h-288v288zm352 0h320v-288h-320v288zm-352-352h288v-320h-288v320zm352 0h320v-320h-320v320zm-352-384h288v-288h-288v288zm736 736h320v-288h-320v288zm-384-736h320v-288h-320v288zm768 736h288v-288h-288v288zm-384-352h320v-320h-320v320zm-352-864v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm736 864h288v-320h-288v320zm-384-384h320v-288h-320v288zm384 0h288v-288h-288v288zm32-480v-288q0-13-9.5-22.5t-22.5-9.5h-64q-13 0-22.5 9.5t-9.5 22.5v288q0 13 9.5 22.5t22.5 9.5h64q13 0 22.5-9.5t9.5-22.5zm384-64v1280q0 52-38 90t-90 38h-1408q-52 0-90-38t-38-90v-1280q0-52 38-90t90-38h128v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h384v-96q0-66 47-113t113-47h64q66 0 113 47t47 113v96h128q52 0 90 38t38 90z"></path>
          </svg>
          Last month
          <svg
            width="20"
            height="20"
            className="ml-2 text-gray-400"
            fill="currentColor"
            viewBox="0 0 1792 1792"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
          </svg>
        </button>
        <span className="text-sm text-gray-400">
          Compared to oct 1- otc 30, 2020
        </span>
      </div>

      {
        // Si no hay canciones recientes, mostrar el botón de iniciar sesión con Spotify
        !recentTracks && (
          <Card align="center" bg="gray.300" py="4" my="5">
            <CardHeader>
              <Heading size="md">Datos extraídos de Spotify</Heading>
            </CardHeader>
            <CardBody>
              <Text>Exporta todo...</Text>
            </CardBody>
            <CardFooter>
              <Button
                onClick={handleLoginWithSpotify}
                colorScheme="teal"
                variant="solid"
              >
                Iniciar sesión con Spotify
              </Button>
            </CardFooter>
          </Card>
        )
      }

      {recentTracks && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Canciones recientes
          </h2>
          <h3 className="text-gray-400 text-md">
            Canciones que has escuchado recientemente
          </h3>
          <SongBarChart data={formattedData} />
        </div>
      )}

      {/* 
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
  {recentTracks?.items.map((song) => (
    <SongCard key={song.played_at} song={song.track} onPlay={() => {}} />
  ))}
</div>
*/}
    </div>
  );
}
