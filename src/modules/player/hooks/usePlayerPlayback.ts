"use client";

import { useCallback } from "react";

import { store } from "#store";
import { TNoMusic } from "#types/nomusic";
import { playerController } from "../controller";

export function usePlayerPlayback(trackId: TNoMusic["id"]) {
  const isActive = store((state) => state.currentTrack?.id === trackId);
  const isPlaying = store((state) => state.currentTrack?.id === trackId && state.isPlaying);
  const isBuffering = store((state) => state.currentTrack?.id === trackId && state.isBuffering);

  const togglePlayback = useCallback(() => {
    return playerController.togglePlayback();
  }, []);

  return { isActive, isPlaying, isBuffering, togglePlayback };
}
