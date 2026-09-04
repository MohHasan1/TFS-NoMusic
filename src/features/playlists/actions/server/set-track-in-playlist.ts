"use server";

import { errorResponse, successResponse } from "#responses";
import { getCurrentUser } from "#services/auth/auth.ports";
import { setTrackInPlaylist } from "../../services/playlists.mutations";
import { ToggleTrackSchema, type TToggleTrack } from "../../validations/playlist";

export async function setTrackInPlaylistAction(id: string, input: TToggleTrack) {
  const parsed = ToggleTrackSchema.safeParse(input);
  if (!parsed.success || !id) {
    return errorResponse([], "Couldn't update the playlist.");
  }

  const userRes = await getCurrentUser();
  if (!userRes.isSuccess) {
    return errorResponse(userRes.errors, userRes.message);
  }

  const res = await setTrackInPlaylist({
    id,
    user: userRes.data,
    trackId: parsed.data.trackId,
    shouldAdd: parsed.data.shouldAdd,
  });
  if (!res.isSuccess) {
    return errorResponse(res.errors, res.message ?? "Couldn't update the playlist.");
  }

  return successResponse(res.data, parsed.data.shouldAdd ? "Added to playlist." : "Removed from playlist.");
}
