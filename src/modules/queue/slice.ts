import { combine } from "zustand/middleware";
import type { TNoMusic } from "@/types/nomusic";
import type { RepeatMode } from "./engine";

export const createNoMusicQueueSlice = combine(
  {
    queue: [] as TNoMusic[],
    currentIndex: 0,
    shuffle: false,
    repeatMode: "off" as RepeatMode,
  },
  (set) => ({
    // --- basic setters

    setQueue: (queue: TNoMusic[]) =>
      set({
        queue,
        currentIndex: 0,
      }),

    setCurrentIndex: (index: number) =>
      set({
        currentIndex: index,
      }),

    setShuffle: (value: boolean) =>
      set({
        shuffle: value,
      }),

    setRepeatMode: (mode: RepeatMode) =>
      set({
        repeatMode: mode,
      }),

    // --- queue mutations (simple only)

    addToQueue: (track: TNoMusic) =>
      set((state) => ({
        queue: [...state.queue, track],
      })),

    removeFromQueue: (id: string | number) =>
      set((state) => {
        const newQueue = state.queue.filter((t) => t.id !== id);

        const newIndex = state.currentIndex >= newQueue.length ? Math.max(0, newQueue.length - 1) : state.currentIndex;

        return {
          queue: newQueue,
          currentIndex: newIndex,
        };
      }),

    clearQueue: () =>
      set({
        queue: [],
        currentIndex: 0,
      }),
  }),
);

export type TNoMusicQueue = ReturnType<typeof createNoMusicQueueSlice>;
