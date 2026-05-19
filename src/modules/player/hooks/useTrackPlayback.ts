"use client";

import { store } from "#store";
import type { TNoMusic } from "#types/nomusic";

export function useTrackPlayback(trackId: TNoMusic["id"]) {
  const isActive = store((state) => state.currentTrack?.id === trackId);
  const isPlaying = store((state) => state.currentTrack?.id === trackId && state.isPlaying);

  return { isActive, isPlaying };
}
