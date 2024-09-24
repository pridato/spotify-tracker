import { ExternalUrl } from "./ExternalUrl";

export interface Artist {
  external_urls: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}