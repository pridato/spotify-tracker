import { Cursors } from "./Cursors";
import { RecentlyPlayedItem } from "./RecentlyPlayedItem";

export interface RecentlyPlayedResponse {
  href: string;
  limit: number;
  next: string;
  cursors: Cursors;
  total: number;
  items: RecentlyPlayedItem[];
}