// NEW

"use client";

import { useCallback } from "react";

import { playerController } from "@/modules/player/controller";
import { queueController } from "@/modules/queue/controller";
import { registryController } from "@/modules/registry/controller";

export function usePlayerQueueControls() {
  const playNext = useCallback(() => {
    const nextTrackId = queueController.getNextTrackId();

    if (!nextTrackId) return;

    const nextTrack = registryController.getTrackById(nextTrackId);

    if (!nextTrack) return;

    return playerController.playTrack(nextTrack);
  }, []);

  const playPrevious = useCallback(() => {
    const previousTrackId = queueController.getPreviousTrackId();

    if (!previousTrackId) return;

    const previousTrack = registryController.getTrackById(previousTrackId);

    if (!previousTrack) return;

    return playerController.playTrack(previousTrack);
  }, []);

  return {
    playNext,
    playPrevious,
  };
}
