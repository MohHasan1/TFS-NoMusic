"use server";

import { errorResponse, successResponse } from "#responses";
import { getCurrentUser } from "#services/auth/auth.ports";
import { updatePlaylist } from "../../services/playlists.mutations";
import { PlaylistUpdateSchema, type TPlaylistUpdate } from "../../validations/playlist";

export async function updatePlaylistAction(id: string, input: TPlaylistUpdate) {
  const parsed = PlaylistUpdateSchema.safeParse(input);
  if (!parsed.success || !id) {
    return errorResponse([], "Please check the playlist details and try again.");
  }

  const userRes = await getCurrentUser();
  if (!userRes.isSuccess) {
    return errorResponse(userRes.errors, userRes.message);
  }

  const res = await updatePlaylist({ id, user: userRes.data, data: parsed.data });
  if (!res.isSuccess) {
    return errorResponse(res.errors, res.message ?? "Couldn't save the playlist.");
  }

  return successResponse(res.data, "Playlist updated.");
}
