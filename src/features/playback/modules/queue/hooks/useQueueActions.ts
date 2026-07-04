"use client";

import { useCallback } from "react";

import { queueController } from "../controller";
import type { TNoMusic } from "#types/nomusic";

export function useQueueActions() {
  const setQueue = useCallback(
    (sourceKey: string, tracks: TNoMusic[], startTrackId: TNoMusic["id"], forceRebuild = false) => {
      queueController.setQueue({ sourceKey, tracks, startTrackId, forceRebuild });
    },
    [],
  );

  const setQueueSourceKey = useCallback((sourceKey: string) => {
    queueController.setQueueSourceKey(sourceKey);
  }, []);

  const getQueueSourceKey = useCallback(() => {
    return queueController.getQueueSourceKey();
  }, []);

  const getCurrentTrackId = useCallback(() => {
    return queueController.getCurrentTrackId();
  }, []);

  const getNextTrackId = useCallback(() => {
    return queueController.getNextTrackId();
  }, []);

  const getPreviousTrackId = useCallback(() => {
    return queueController.getPreviousTrackId();
  }, []);

  const extendQueue = useCallback((sourceKey: string, tracks: TNoMusic[]) => {
    queueController.extendQueue(sourceKey, tracks);
  }, []);

  const deleteById = useCallback((sourceKey: string, deleteId: string) => {
    return queueController.deleteById(sourceKey, deleteId);
  }, []);

  const clearQueue = useCallback(() => {
    queueController.clearQueue();
  }, []);

  return {
    setQueue,
    getQueueSourceKey,
    setQueueSourceKey,
    getCurrentTrackId,
    getNextTrackId,
    getPreviousTrackId,
    extendQueue,
    deleteById,
    clearQueue,
  };
}
