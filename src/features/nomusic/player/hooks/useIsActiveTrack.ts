"use client";

import { store } from "#store";
import type { TNoMusic } from "#types/nomusic";

export function useIsActiveTrack(trackId: TNoMusic["id"]) {
  const isActive = store((state) => state.currentTrack?.id === trackId);

  return { isActive };
}
