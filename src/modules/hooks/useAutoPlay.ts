"use client";

import { useEffect } from "react";

import { playerEngine } from "@/modules/player/engine";
import { usePlayerQueueControls } from "./usePlayerQueueControls";

export function useAutoPlay() {
  const { playNext } = usePlayerQueueControls();

  useEffect(() => {
    return playerEngine.subscribeEnded(() => {
      playNext();
    });
  }, []);
}
