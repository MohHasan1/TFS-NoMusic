// import { store } from "@/store";

// export function useQueueSetup() {
//   const setQueue = store.use.setQueue();
//   const setCurrentIndex = store.use.setCurrentIndex();

//   return {
//     setQueue,
//     setCurrentIndex,
//   };
// }

"use client";

import { useCallback } from "react";

import type { TNoMusic } from "#types/nomusic";
import { queueController } from "../controller";

export function useQueueSetup() {
  const setQueue = useCallback((tracks: TNoMusic[], startTrackId: TNoMusic["id"]) => {
    queueController.setQueue(tracks, startTrackId);
  }, []);

  const setQueueForSource = useCallback(
    (sourceKey: string, tracks: TNoMusic[], startTrackId: TNoMusic["id"]) => {
      queueController.setQueueForSource({sourceKey, tracks, startTrackId});
    },
    [],
  );

  return {
    setQueueForSource,
    setQueue,
  };
}
