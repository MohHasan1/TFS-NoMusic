"use client";

import { playerController } from "#playback-player/controller";
import { queueController } from "#playback-queue/controller";
import { registryController } from "#playback-registry/controller";
import { useCallback } from "react";

export function useLogoutCleanup() {
  const cleanupBeforeLogout = useCallback(() => {
    playerController.clearPlayer();
    queueController.clearQueue();
    registryController.clearRegistry();
  }, []);

  return {
    cleanupBeforeLogout,
  };
}
