"use client";

import { useCallback } from "react";

import { store } from "#store";
import { playerController } from "../controller";

// NOTE: Will cause component re-render every seconds when a track is playing:
export function usePlayerSeek() {
  const currentTime = store.use.currentTime();
  const duration = store.use.duration();

  const seekToFn = useCallback((time: number) => {
    playerController.seekTrackTo(time);
  }, []);

  return {
    currentTime,
    duration,
    seekTo: seekToFn,
  };
}
