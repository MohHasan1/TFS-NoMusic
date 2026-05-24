"use client";

import { useCallback } from "react";

import { playerController } from "#modules/player/controller";
import { queueController } from "#modules/queue/controller";
import { registryController } from "#modules/registry/controller";

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
