"use client";

import { useCallback } from "react";

import type { TNoMusic } from "#types/nomusic";
import { registryController } from "../controller";

export function useRegistryActions() {
  const addTracks = useCallback((tracks: TNoMusic[]) => {
    registryController.addTracks(tracks);
  }, []);

  const getTrackById = useCallback((trackId: TNoMusic["id"]) => {
    return registryController.getTrackById(trackId);
  }, []);

  const clearRegistry = useCallback((trackId: TNoMusic["id"]) => {
    return registryController.clearRegistry();
  }, []);

  return {
    addTracks,
    getTrackById,
    clearRegistry,
  };
}
