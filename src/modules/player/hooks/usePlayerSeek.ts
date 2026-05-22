"use client";

import { useCallback } from "react";

import { store } from "#store";
import { playerController } from "../controller";

// NOTE: This hook will casue the UI to re-render every seconds.
export function usePlayerSeek() {
  const currentTime = store((state) => state.currentTime);
  const duration = store((state) => state.duration);

  const seekTo = useCallback((time: number) => {
    playerController.seekTrack(time);
  }, []);

  return {
    currentTime,
    duration,
    seekTo,
  };
}
