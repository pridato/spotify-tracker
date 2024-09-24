import { Album } from "./Album";
import { Artist } from "./Artist";
import { ExternalIds } from "./ExternalIds";
import { ExternalUrl } from "./ExternalUrl";

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrl;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: unknown; // Aquí puedes definir otra interfaz si tienes más información
  restrictions: { reason: string };
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
  is_local: boolean;
}