import "server-only";

import { APIError } from "payload";
import { getPayloadClient } from "#payload-client";
import type { Playlist, User } from "#payload-types";
import { tryCatchResponse } from "#trycatch-response";
import { PLAYLIST_LIMITS } from "../constants/playlist";
import type { TPlaylistUpdate, TReorderTracks } from "../validations/playlist";
import { mapPlaylist } from "./playlists.mapper";
import { PLAYLIST_LIST_SELECT } from "./playlists.select";

export async function createPlaylist({ user, name, trackId }: { user: User; name: string; trackId?: string }) {
  const payload = await getPayloadClient();

  return tryCatchResponse(async () => {
    const { totalDocs } = await payload.count({
      collection: "playlists",
      overrideAccess: false,
      user,
      where: { user: { equals: user.id } },
    });

    if (totalDocs >= PLAYLIST_LIMITS.perUser) {
      throw new APIError(`You can only have ${PLAYLIST_LIMITS.perUser} playlists.`, 400, null, true);
    }

    const doc = await payload.create({
      collection: "playlists",
      overrideAccess: false,
      user,
      select: PLAYLIST_LIST_SELECT,
      data: {
        name,
        slug: "", // set by generateSlugBeforeValidate
        user: user.id,
        visibility: "private",
        ...(trackId ? { tracks: [trackId] } : {}),
      },
    });

    return mapPlaylist(doc as Playlist);
  });
}

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

export async function reorderTracks({ id, user, trackIds }: { id: string; user: User; trackIds: TReorderTracks["trackIds"] }) {
  const payload = await getPayloadClient();

  return tryCatchResponse(async () => {
    // Read the playlist's current track ids (also enforces owner access).
    const current = await payload.findByID({
      collection: "playlists",
      id,
      depth: 0,
      overrideAccess: false,
      user,
      select: { tracks: true },
    });

    const currentIds = ((current as Playlist).tracks ?? []).map((track) => (typeof track === "object" ? track.id : track));
    const currentSet = new Set(currentIds);

    // The client sends the full desired list; keep only ids really on the playlist.
    // Anything the client left out is treated as removed.
    const next = trackIds.filter((trackId) => currentSet.has(trackId));

    // Persist the new order / membership.
    const doc = await payload.update({
      collection: "playlists",
      id,
      overrideAccess: false,
      user,
      select: PLAYLIST_LIST_SELECT,
      data: { tracks: next },
    });

    return mapPlaylist(doc as Playlist);
  });
}
