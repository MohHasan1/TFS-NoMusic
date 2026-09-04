import "server-only";

import { getPayloadClient } from "#payload-client";
import type { Playlist, User } from "#payload-types";
import { tryCatchResponse } from "#trycatch-response";
import type { TPlaylistUpdate } from "../validations/playlist";
import { mapPlaylist } from "./playlists.mapper";
import { PLAYLIST_LIST_SELECT } from "./playlists.select";

export async function updatePlaylist({ id, user, data }: { id: string; user: User; data: TPlaylistUpdate }) {
  const payload = await getPayloadClient();

  return tryCatchResponse(async () => {
    const doc = await payload.update({
      collection: "playlists",
      id,
      overrideAccess: false,
      user,
      select: PLAYLIST_LIST_SELECT,
      data,
    });

    return mapPlaylist(doc as Playlist);
  });
}
