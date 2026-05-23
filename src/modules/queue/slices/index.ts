import { combine } from "zustand/middleware";
import type { TNoMusic } from "#types/nomusic";

export const createTrackQueueSlice = combine(
  {
    queueIds: [] as TQueueState["queueIds"],
    currentIndex: -1,
  },
  (set) => ({
    setQueueIds: (queueIds: TQueueState["queueIds"]) => {
      set({ queueIds });
    },

    setCurrentIndex: (currentIndex: TQueueState["currentIndex"]) => {
      set({ currentIndex });
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
  queueIds: TNoMusic["id"][];
  currentIndex: number;
};
