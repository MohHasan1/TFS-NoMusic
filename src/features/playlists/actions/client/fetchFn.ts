import type { PaginatedDocs } from "payload";
import { stringify } from "qs-esm";

import { NOMUSIC_DEFAULT_SELECT } from "#collection-default-select/nomusic";
import type { Playlist } from "#payload-types";
import { mapPlaylistDetail, mapPlaylists } from "../../services/playlists.mapper";
import { PLAYLIST_DETAIL_SELECT, PLAYLIST_LIST_SELECT } from "../../services/playlists.select";
import type { TPlaylist, TPlaylistDetail } from "../../types/playlist";

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

export async function fetchPlaylistFn(id: string): Promise<TPlaylistDetail> {
  const query = stringify(
    {
      depth: 1,
      select: PLAYLIST_DETAIL_SELECT,
      populate: { nomusic: NOMUSIC_DEFAULT_SELECT },
    },
    { addQueryPrefix: true },
  );

  const response = await fetch(`/api/playlists/${id}${query}`);
  if (!response.ok) {
    throw new Error("Failed to load playlist.");
  }

  const doc = (await response.json()) as Playlist;

  return mapPlaylistDetail(doc);
}
