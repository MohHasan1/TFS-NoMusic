"use client";

import { useCallback } from "react";
import { playerController } from "../controller";

export function usePlayerSeekTo() {
  const seekToFn = useCallback((time: number) => {
    playerController.seekTrackTo(time);
  }, []);

  return {
    seekTo: seekToFn,
  };
}
