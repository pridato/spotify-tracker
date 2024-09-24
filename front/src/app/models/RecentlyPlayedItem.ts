import { Context } from "./Context";
import { Track } from "./Track";

export interface RecentlyPlayedItem {
  track: Track;
  played_at: string;
  context: Context;
}