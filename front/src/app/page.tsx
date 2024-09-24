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
import SongCard from "./components/Card";
import { RecentlyPlayedResponse } from "./models/RecentlyPlayedResponse";

export default function Home() {
  const toast = useToast();
  const status = "error";
  const [recentTracks, setRecentTracks] = useState<RecentlyPlayedResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      // Si hay código, se ha logueado con éxito, devolver el code al back
      if (code) {
        const access_token = await exchangeCodeForToken(code);
        if (!access_token) return; // Si no se obtuvo el token, no continuar.

        const data = await getUserRecentTracks(access_token.access_token);
        setRecentTracks(data);
        console.log(data);
      }
    };

    fetchData();
  }, [toast]); // Solo depende de toast

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
    <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className=" relative hidden h-screen shadow-lg lg:block w-80">
          <div className="h-full bg-white dark:bg-gray-700">
            <div className="flex items-center justify-start pt-6 ml-8">
              <p className="text-xl font-bold dark:text-white">Plannifer</p>
            </div>
            {/* Sidebar */}
            <nav className="mt-6">
              <div>
                <a
                  className="flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-800 transition-colors duration-200 border-l-4 border-purple-500 dark:text-white"
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z"></path>
                    </svg>
                  </span>
                  <span className="mx-2 text-sm font-normal">Home</span>
                </a>
                <a
                  className="flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-400 transition-colors duration-200 border-l-4 border-transparent hover:text-gray-800"
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2048 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                    </svg>
                  </span>
                  <span className="mx-2 text-sm font-normal">
                    Refered Projects
                    <span className="w-4 h-2 p-1 ml-4 text-xs text-gray-400 bg-gray-200 rounded-lg">
                      0
                    </span>
                  </span>
                </a>
                <a
                  className="flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-400 transition-colors duration-200 border-l-4 border-transparent hover:text-gray-800"
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z"></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">Resources</span>
                </a>
                <a
                  className="flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-400 transition-colors duration-200 border-l-4 border-transparent hover:text-gray-800"
                  href="#"
                >
                  <span className="text-left">
                    <svg
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 2048 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M580 461q0-41-25-66t-66-25q-43 0-76 25.5t-33 65.5q0 39 33 64.5t76 25.5q41 0 66-24.5t25-65.5zm743 507q0-28-25.5-50t-65.5-22q-27 0-49.5 22.5t-22.5 49.5q0 28 22.5 50.5t49.5 22.5q40 0 65.5-22t25.5-51zm-236-507q0-41-24.5-66t-65.5-25q-43 0-76 25.5t-33 65.5q0 39 33 64.5t76 25.5q41 0 65.5-24.5t24.5-65.5zm635 507q0-28-26-50t-65-22q-27 0-49.5 22.5t-22.5 49.5q0 28 22.5 50.5t49.5 22.5q39 0 65-22t26-51zm-266-397q-31-4-70-4-169 0-311 77t-223.5 208.5-81.5 287.5q0 78 23 152-35 3-68 3-26 0-50-1.5t-55-6.5-44.5-7-54.5-10.5-50-10.5l-253 127 72-218q-290-203-290-490 0-169 97.5-311t264-223.5 363.5-81.5q176 0 332.5 66t262 182.5 136.5 260.5zm592 561q0 117-68.5 223.5t-185.5 193.5l55 181-199-109q-150 37-218 37-169 0-311-70.5t-223.5-191.5-81.5-264 81.5-264 223.5-191.5 311-70.5q161 0 303 70.5t227.5 192 85.5 263.5z"></path>
                    </svg>
                  </span>
                  <span className="mx-4 text-sm font-normal">
                    Store feedback
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div className="flex flex-col w-full md:space-y-4">
          {/* Header */}
          <header className="z-40 flex items-center justify-between w-full h-16">
            <div className="block ml-6 lg:hidden">
              <button className="flex items-center p-2 text-gray-500 bg-white rounded-full shadow text-md">
                <svg
                  width="20"
                  height="20"
                  className="text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
            <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
              <div className="relative flex items-center justify-end w-full p-1 space-x-4">
                <button className="flex items-center p-2 text-gray-400 bg-white rounded-full shadow hover:text-gray-700 text-md">
                  <svg
                    width="20"
                    height="20"
                    className=""
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z"></path>
                  </svg>
                </button>
                <button className="flex items-center p-2 text-gray-400 bg-white rounded-full shadow hover:text-gray-700 text-md">
                  <svg
                    width="20"
                    height="20"
                    className="text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M912 1696q0-16-16-16-59 0-101.5-42.5t-42.5-101.5q0-16-16-16t-16 16q0 73 51.5 124.5t124.5 51.5q16 0 16-16zm816-288q0 52-38 90t-90 38h-448q0 106-75 181t-181 75-181-75-75-181h-448q-52 0-90-38t-38-90q50-42 91-88t85-119.5 74.5-158.5 50-206 19.5-260q0-152 117-282.5t307-158.5q-8-19-8-39 0-40 28-68t68-28 68 28 28 68q0 20-8 39 190 28 307 158.5t117 282.5q0 139 19.5 260t50 206 74.5 158.5 85 119.5 91 88z"></path>
                  </svg>
                </button>
                <span className="w-1 h-8 bg-gray-200 rounded-lg"></span>
                <a href="#" className="relative block"></a>
                <button className="flex items-center text-gray-500 dark:text-white text-md">
                  Charlie R
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
              </div>
            </div>
          </header>

          {/* Main */}
          <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
            <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
              Bienvenido usuario de Spotify
            </h1>
            <h2 className="text-gray-400 text-md pb-4">
              Que deseas hacer hoy?
            </h2>

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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-6">
              {recentTracks?.items.map((song) => (
                <SongCard key={song.played_at} song={song.track} onPlay={() => {}} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
