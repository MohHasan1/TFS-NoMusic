"use server";

import { errorResponse, successResponse } from "#responses";
import { getCurrentUser } from "#services/auth/auth.ports";
import { createPlaylist } from "../../services/playlists.mutations";
import { PlaylistCreateSchema, type TPlaylistCreate } from "../../validations/playlist";

export async function createPlaylistAction(input: TPlaylistCreate & { trackId?: string }) {
  const parsed = PlaylistCreateSchema.safeParse(input);
  if (!parsed.success) {
    return errorResponse([], "Please check the playlist name and try again.");
  }

  const userRes = await getCurrentUser();
  if (!userRes.isSuccess) {
    return errorResponse(userRes.errors, userRes.message);
  }

  const res = await createPlaylist({ user: userRes.data, name: parsed.data.name, trackId: input.trackId });
  if (!res.isSuccess) {
    return errorResponse(res.errors, res.message ?? "Couldn't create the playlist.");
  }

  return successResponse(res.data, "Playlist created.");
}
