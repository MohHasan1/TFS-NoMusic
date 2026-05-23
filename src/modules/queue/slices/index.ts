import { combine } from "zustand/middleware";
import type { TNoMusic } from "#types/nomusic";

export const createTrackQueueSlice = combine(
  {
    queueSourceKey: null as TQueueState["queueSourceKey"],
    queueIds: [] as TQueueState["queueIds"],
    queueIdIndexMap: {} as TQueueState["queueIdIndexMap"],
    currentIndex: -1,
  },
  (set) => ({
    setQueueIds: (queueIds: TQueueState["queueIds"]) => {
      set({ queueIds });
    },

    setCurrentIndex: (currentIndex: TQueueState["currentIndex"]) => {
      set({ currentIndex });
    },

    setQueueSourceKey: (queueSourceKey: TQueueState["queueSourceKey"]) => {
      set({ queueSourceKey });
    },
    
    setQueueIdIndexMap: (queueIdIndexMap: TQueueState["queueIdIndexMap"]) => {
      set({ queueIdIndexMap });
    },

    clearQueue: () => {
      set({
        queueIds: [],
        currentIndex: -1,
      });
    },
  }),
);

export type TTrackQueue = ReturnType<typeof createTrackQueueSlice>;

export type TQueueState = {
  queueSourceKey: string | null; // which source's (page:nomusic, playlist:A) tracks is in the queue
  queueIds: TNoMusic["id"][];
  queueIdIndexMap: Record<string, number>;
  currentIndex: number;
};
