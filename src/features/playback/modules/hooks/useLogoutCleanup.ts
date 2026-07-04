"use client";

import { useCallback } from "react";

import { registryController } from "#playback-registry/controller";
import { playerController } from "#playback-player/controller";
import { queueController } from "#playback-queue/controller";

export function useLogoutCleanup() {
  const cleanupBeforeLogout = useCallback(() => {
    queueController.clearQueue();
    playerController.clearPlayer();
    registryController.clearRegistry();
  }, []);

  return {
    cleanupBeforeLogout,
  };
}
