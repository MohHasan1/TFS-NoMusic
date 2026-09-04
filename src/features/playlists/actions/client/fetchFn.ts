import type { PaginatedDocs } from "payload";
import { stringify } from "qs-esm";

import type { Playlist } from "#payload-types";
import { mapPlaylists } from "../../services/playlists.mapper";
import { PLAYLIST_LIST_SELECT } from "../../services/playlists.select";
import type { TPlaylist } from "../../types/playlist";

export async function fetchMyPlaylistsFn(): Promise<TPlaylist[]> {
  const query = stringify(
    {
      depth: 0,
      limit: 20, // user can create max 10 playlists
      sort: "-updatedAt",
      pagination: false,
      select: PLAYLIST_LIST_SELECT,
    },
    { addQueryPrefix: true },
  );

  const response = await fetch(`/api/playlists${query}`);
  if (!response.ok) {
    throw new Error("Failed to load playlists.");
  }

  const result = (await response.json()) as PaginatedDocs<Playlist>;

  return mapPlaylists(result.docs);
}
