"use client";

import { useEffect } from "react";

import { useTrackNavigation } from "./useTrackNavigation";
import { playerController } from "#modules/player/controller";

export function useTrackAutoPlay() {
  const { playNext } = useTrackNavigation();

  useEffect(() => {
    return playerController.subscribeTrackEnded(() => {
      playNext();
    });
  }, []);
}
