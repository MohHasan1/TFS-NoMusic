"use client";

import { useCallback } from "react";
import { playerController } from "../controller";

export function usePlayerToggle() {
  const toggleTrack = useCallback(() => {
    return playerController.togglePlayback();
  }, []);

  return {
    toggleTrack,
  };
}
