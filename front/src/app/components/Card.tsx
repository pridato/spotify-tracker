"use client";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Track } from "../models/Track";
import { useRef, useEffect } from "react";

interface SongCardProps {
  song: Track;
  onPlay: (songId: string) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Crear una referencia para el audio

  const handlePlay = () => {
    // Si hay un audio en reproducción, pausa y resetea
    if(audioRef.current === null) return

    if (!audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Si hay una URL de vista previa, crear una nueva instancia de Audio
    else {
      audioRef.current = new Audio(song.preview_url);
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch((error) => {
        console.error("Error al reproducir el audio:", error);
      });
    } 
  };

  // Limpiar la referencia de audio al desmontar el componente
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Limpiar la fuente para liberar recursos
      }
    };
  }, []);

  return (
    <Card borderWidth="1px" borderRadius="lg" overflow="hidden">
      <CardHeader>
        <Heading size="md">{song.name}</Heading>
      </CardHeader>
      <CardBody>
        <Text fontSize="sm">
          Artists: {song.artists.map((artist, index) => (
            <span key={index}>
              {artist.name}{index < song.artists.length - 1 ? ', ' : ''}
            </span>
          ))}
        </Text>
        <Text fontSize="sm">Album: {song.album.name}</Text>
        <Text fontSize="sm">Duration: {(song.duration_ms / 1000).toFixed(2)} seconds</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="teal" onClick={handlePlay}>
          Play
        </Button>
        <audio ref={audioRef} style={{ display: 'none' }} /> {/* Elemento de audio oculto para reproducir la canción */}
      </CardFooter>
    </Card>
  );
};

export default SongCard;
