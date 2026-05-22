"use client";

import { useCallback } from "react";

import { store } from "#store";
import type { TNoMusic } from "#types/nomusic";
import { playerController } from "../controller";

// TODO: rename to usePlaybackStatus()
export function useTrackPlayback(trackId: TNoMusic["id"]) {
  const isActive = store((state) => state.currentTrack?.id === trackId);
  const isPlaying = store((state) => state.currentTrack?.id === trackId && state.isPlaying);
  const isBuffering = store((state) => state.currentTrack?.id === trackId && state.isBuffering);

  const togglePlayback = useCallback(() => {
    return playerController.togglePlayback();
  }, []);

  return { isActive, isPlaying, isBuffering, togglePlayback };
}
