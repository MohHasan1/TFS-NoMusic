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

  const appendQueue = useCallback((trackId: TNoMusic["id"]) => {
    queueController.appendQueue(trackId);
  }, []);

  const extendQueue = useCallback((tracks: TNoMusic[]) => {
    queueController.extendQueue(tracks);
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
