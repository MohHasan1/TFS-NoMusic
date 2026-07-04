"use client";

import { useCallback } from "react";
import { playerController } from "../controller";

export function usePlayerToggle() {
  const toggleTrack = useCallback(() => {
    void playerController.togglePlayback();
  }, []);

  return {
    toggleTrack,
  };
}
