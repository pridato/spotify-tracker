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

interface SongCardProps {
  song: Track;
  onPlay: (songId: string) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onPlay }) => {
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
        <Text fontSize="sm">Duration: {song.duration_ms} seconds</Text>
      </CardBody>
      <CardFooter>
        <Button colorScheme="teal" onClick={() => onPlay(song.id)}>
          Play
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SongCard;
