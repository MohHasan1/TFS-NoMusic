import { combine } from "zustand/middleware";
import type { TNoMusic } from "#types/nomusic";

export const createQueueSlice = combine(
  {
    queueSourceKey: null as TQueueState["queueSourceKey"],
    queueIds: [] as TQueueState["queueIds"],
    queueIdIndexMap: {} as TQueueState["queueIdIndexMap"],
    currentIndex: -1,
    repeatMode: "all" as TQueueState["repeatMode"],
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

    setRepeatMode: (repeatMode: TQueueState["repeatMode"]) => {
      set({ repeatMode });
    },

    clearQueue: () => {
      set({
        queueSourceKey: null,
        queueIds: [],
        queueIdIndexMap: {},
        currentIndex: -1,
        repeatMode: "all",
      });
    },
  }),
);

export type TQueueSlice = ReturnType<typeof createQueueSlice>;

export type TQueueState = {
  queueSourceKey: string | null; // which source's (page:nomusic, playlist:A) tracks is in the queue
  queueIds: TNoMusic["id"][];
  queueIdIndexMap: Record<string, number>;
  currentIndex: number;
  repeatMode: "off" | "one" | "all" | "random";
};
