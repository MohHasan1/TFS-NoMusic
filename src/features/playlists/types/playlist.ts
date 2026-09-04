import type { Playlist } from "#payload-types";

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
