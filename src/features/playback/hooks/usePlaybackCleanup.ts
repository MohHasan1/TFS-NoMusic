"use client";

import { useCallback } from "react";
import { playerController } from "#playback-player/controller";
import { queueController } from "#playback-queue/controller";
import { registryController } from "#playback-registry/controller";

export function usePlaybackCleanup() {
  const cleanupPlayback = useCallback(() => {
    queueController.clearQueue();
    playerController.clearPlayer();
    registryController.clearRegistry();
  }, []);

  return {
    cleanupPlayback,
  };
}
