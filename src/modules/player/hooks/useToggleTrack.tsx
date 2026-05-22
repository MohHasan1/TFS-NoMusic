"use client";

import { useCallback } from "react";

import { playerController } from "../controller";

export function useTogglePlayback() {
  const toggleTrack = useCallback(() => {
    return playerController.togglePlayback();
  }, []);

  return {
    toggleTrack,
  };
}
