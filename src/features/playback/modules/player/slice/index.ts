import { combine } from "zustand/middleware";
import type { TNoMusic } from "#types/nomusic";

export const createPlayerSlice = combine(
  {
    volume: 1,
    duration: 0,
    currentTime: 0,
    isPlaying: false,
    isBuffering: false,
    error: null as string | null,
    currentTrack: null as TNoMusic | null,
  },
  (set) => ({
    setCurrentTrack: (track: TNoMusic) =>
      set((state) => {
        if (state.currentTrack?.id === track.id) return {};
        return {
          error: null,
          duration: 0,
          currentTime: 0,
          currentTrack: track,
        };
      }),

    setVolume: (volume: number) => set({ volume }),
    setError: (error: string | null) => set({ error }),
    setDuration: (duration: number) => set({ duration }),
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
    setIsBuffering: (isBuffering: boolean) => set({ isBuffering }),
    setCurrentTime: (currentTime: number) => set({ currentTime }),
    clearPlayer: () =>
      set({
        volume: 1,
        duration: 0,
        currentTime: 0,
        isPlaying: false,
        isBuffering: false,
        error: null,
        currentTrack: null,
      }),
  }),
);

export type TPlayerSlice = ReturnType<typeof createPlayerSlice>;
