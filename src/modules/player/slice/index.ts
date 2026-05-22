import { combine } from "zustand/middleware";
import type { TNoMusic } from "#types/nomusic";

export const createNoMusicPlayerSlice = combine(
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
          currentTrack: track,
          currentTime: 0,
          duration: 0,
          error: null,
        };
      }),

    setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
    setIsBuffering: (isBuffering: boolean) => set({ isBuffering }),
    setError: (error: string | null) => set({ error }),
    setVolume: (volume: number) => set({ volume }),
    setTime: (currentTime: number) => set({ currentTime }), // TODO: remove
    setCurrentTime: (currentTime: number) => set({ currentTime }),
    setDuration: (duration: number) => set({ duration }),
  }),
);

export type TNoMusicPlayer = ReturnType<typeof createNoMusicPlayerSlice>;
