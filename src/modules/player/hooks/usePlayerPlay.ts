"use client";

import { useCallback } from "react";

import { TNoMusic } from "#types/nomusic";
import { playerController } from "../controller";

export function usePlayerPlay() {
  const playTrack = useCallback((track: TNoMusic) => {
    return playerController.playTrack(track);
  }, []);

  const playTrackById = useCallback((trackId: TNoMusic["id"]) => {
    return playerController.playTrackById(trackId);
  }, []);

  return {
    playTrack,
    playTrackById,
  };
}
