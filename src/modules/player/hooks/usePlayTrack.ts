"use client";

import { useCallback } from "react";

import type { TNoMusic } from "#types/nomusic";
import { playerController } from "../controller";

export function usePlayTrack() {
  const playTrack = useCallback((track: TNoMusic) => {
    return playerController.playTrack(track);
  }, []);

  return {
    playTrack,
  };
}
