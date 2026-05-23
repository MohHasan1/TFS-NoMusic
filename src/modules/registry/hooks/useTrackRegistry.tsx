"use client";

import { useCallback } from "react";

import type { TNoMusic } from "#types/nomusic";
import { registryController } from "../controller";

export function useTrackRegistry() {
  const addTracks = useCallback((tracks: TNoMusic[]) => {
    registryController.addTracks(tracks);
  }, []);

  const getTrackById = useCallback((trackId: TNoMusic["id"]) => {
    return registryController.getTrackById(trackId);
  }, []);

  return {
    addTracks,
    getTrackById,
  };
}
