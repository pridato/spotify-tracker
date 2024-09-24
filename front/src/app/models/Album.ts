import { Artist } from "./Artist";
import { ExternalUrl } from "./ExternalUrl";
import { Image } from "./Image";

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrl;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restrictions: { reason: string };
  type: 'album';
  uri: string;
  artists: Artist[];
}