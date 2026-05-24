"use client";

import { useCallback } from "react";

import { store } from "#store";
import { queueController } from "../controller";

export function useQueueRepeat() {
  const repeatMode = store.use.repeatMode();
  const setRepeatMode = store.use.setRepeatMode();

  const cycleRepeatMode = useCallback(() => {
    setRepeatMode(queueController.getNextRepeatMode());
  }, [repeatMode, setRepeatMode]);

  return {
    repeatMode,
    setRepeatMode,
    cycleRepeatMode,
  };
}
