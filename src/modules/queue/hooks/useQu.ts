"use client";

// NOt used yet
import { useCallback } from "react";

import type { TNoMusic } from "#types/nomusic";
import { queueController } from "../controller";

export function useNOYQueueControls() {
  const getNextTrackId = useCallback(() => {
    return queueController.getNextTrackId();
  }, []);

  const getPreviousTrackId = useCallback(() => {
    return queueController.getPreviousTrackId();
  }, []);

  const addToQueue = useCallback((trackId: TNoMusic["id"]) => {
    queueController.addToQueue(trackId);
  }, []);

  const playNext = useCallback((trackId: TNoMusic["id"]) => {
    queueController.playNext(trackId);
  }, []);

  return {
    getNextTrackId,
    getPreviousTrackId,
    addToQueue,
    playNext,
  };
}
