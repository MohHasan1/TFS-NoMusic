"use client";

import { useCallback } from "react";

import { queueController } from "#modules/queue/controller";
import { playerController } from "#modules/player/controller";
import { registryController } from "#modules/registry/controller";

export function useTrackNavigation() {
  const playNext = useCallback(() => {
    const nextTrackId = queueController.getNextTrackId();
    if (!nextTrackId) return;

    const nextTrack = registryController.getTrackById(nextTrackId);
    if (!nextTrack) return;

    playerController.playTrack(nextTrack);
  }, []);

  const playPrevious = useCallback(() => {
    const previousTrackId = queueController.getPreviousTrackId();
    if (!previousTrackId) return;

    const previousTrack = registryController.getTrackById(previousTrackId);
    if (!previousTrack) return;

    playerController.playTrack(previousTrack);
  }, []);

  return {
    playNext,
    playPrevious,
  };
}
