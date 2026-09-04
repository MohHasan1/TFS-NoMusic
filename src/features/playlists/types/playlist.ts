import type { Playlist } from "#payload-types";
import type { TNoMusic } from "#types/nomusic";

export type TPlaylist = {
  id: Playlist["id"];
  name: Playlist["name"];
  author: Playlist["author"];
  description: Playlist["description"];
  visibility: Playlist["visibility"];
  trackCount: Playlist["trackCount"];
  updatedAt: Playlist["updatedAt"];
  coverImage: string | null | undefined;
};

export type TPlaylistDetail = TPlaylist & {
  tracks: TNoMusic[];
};
