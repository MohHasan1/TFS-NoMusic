"use server";

import { errorResponse, successResponse } from "#responses";
import { getCurrentUser } from "#services/auth/auth.ports";
import { reorderTracks } from "../../services/playlists.mutations";
import { ReorderTracksSchema, type TReorderTracks } from "../../validations/playlist";

export async function reorderPlaylistTracksAction(id: string, input: TReorderTracks) {
  const parsed = ReorderTracksSchema.safeParse(input);
  if (!parsed.success || !id) {
    return errorResponse([], "Couldn't reorder the playlist.");
  }

  const userRes = await getCurrentUser();
  if (!userRes.isSuccess) {
    return errorResponse(userRes.errors, userRes.message);
  }

  const res = await reorderTracks({ id, user: userRes.data, trackIds: parsed.data.trackIds });
  if (!res.isSuccess) {
    return errorResponse(res.errors, res.message ?? "Couldn't reorder the playlist.");
  }

  return successResponse(res.data, "Playlist order saved.");
}
