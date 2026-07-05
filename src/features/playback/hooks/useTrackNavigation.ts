"use client";

import { playerController } from "#playback-player/controller";
import { queueController } from "#playback-queue/controller";
import { registryController } from "#playback-registry/controller";
import { useCallback } from "react";

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
