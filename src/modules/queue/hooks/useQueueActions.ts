"use client";

import { useCallback } from "react";

import type { TNoMusic } from "#types/nomusic";
import { queueController } from "../controller";

export function useQueueActions() {
  const setQueue = useCallback(
    (sourceKey: string, tracks: TNoMusic[], startTrackId: TNoMusic["id"]) => {
      queueController.setQueue({ sourceKey, tracks, startTrackId });
    },
    [],
  );

  const getCurrentTrackId = useCallback(() => {
    return queueController.getCurrentTrackId();
  }, []);

  const getNextTrackId = useCallback(() => {
    return queueController.getNextTrackId();
  }, []);

  const getPreviousTrackId = useCallback(() => {
    return queueController.getPreviousTrackId();
  }, []);

  const appendQueue = useCallback((sourceKey: string, trackId: TNoMusic["id"]) => {
    queueController.appendQueue(sourceKey, trackId);
  }, []);

  const extendQueue = useCallback((sourceKey: string, tracks: TNoMusic[]) => {
    queueController.extendQueue(sourceKey, tracks);
  }, []);

  const clearQueue = useCallback(() => {
    queueController.clearQueue();
  }, []);

  return {
    setQueue,
    getCurrentTrackId,
    getNextTrackId,
    getPreviousTrackId,
    appendQueue,
    extendQueue,
    clearQueue,
  };
}
