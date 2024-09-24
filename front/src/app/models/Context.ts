import { ExternalUrl } from './ExternalUrl';

export interface Context {
  type: string;
  href: string;
  external_urls: ExternalUrl;
  uri: string;
}