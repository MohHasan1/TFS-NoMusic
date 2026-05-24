"use client";

import { store } from "#store";
import { TNoMusic } from "#types/nomusic";

// NOTE: Will cause component re-render everytime a track changes:
export function usePlayerTrackBuffering(trackId: TNoMusic["id"]) {
  const isBuffering = store((state) => state.currentTrack?.id === trackId && state.isBuffering);

  return { isBuffering };
}
