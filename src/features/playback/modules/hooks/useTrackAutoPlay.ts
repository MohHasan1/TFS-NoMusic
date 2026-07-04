"use client";

import { useEffect } from "react";

import { useTrackNavigation } from "./useTrackNavigation";
import { playerController } from "#playback-player/controller";


export function useTrackAutoPlay() {
  const { playNext } = useTrackNavigation();

  useEffect(() => {
    return playerController.subscribeTrackEnded(() => {
      playNext();
    });
  }, []);
}
