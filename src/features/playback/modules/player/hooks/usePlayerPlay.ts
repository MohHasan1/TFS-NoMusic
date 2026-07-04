"use client";

import { useCallback } from "react";

import { TNoMusic } from "#types/nomusic";
import { playerController } from "../controller";

export function usePlayerPlay() {
  const playTrack = useCallback((track: TNoMusic) => {
    void playerController.playTrack(track);
  }, []);

  const playTrackById = useCallback((trackId: TNoMusic["id"]) => {
    void playerController.playTrackById(trackId);
  }, []);

  return {
    playTrack,
    playTrackById,
  };
}
