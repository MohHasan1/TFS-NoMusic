import { TNoMusic } from "@/types/nomusic";
import { combine } from "zustand/middleware";


export const createNoMusicPlayerSlice = combine(
  {
    currentTrack: null as TNoMusic | null,
    isPlaying: false as boolean,
    volume: 1,
    currentTime: 0,
    duration: 0,
  },
  (set) => ({
    setCurrentTrack: (track: TNoMusic) =>
      set((state) => {
        if (state.currentTrack?.id === track.id) {
          return { isPlaying: true };
        }

        return {
          currentTrack: track,
          isPlaying: true,
          currentTime: 0,
        };
      }),

    setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),

    toggleIsPlaying: () => set((s) => ({ isPlaying: !s.isPlaying })),

    setVolume: (volume: number) => set({ volume }),

    setTime: (currentTime: number) => set({ currentTime }),

    setDuration: (duration: number) => set({ duration }),
  }),
);

export type TNoMusicPlayer = ReturnType<typeof createNoMusicPlayerSlice>;

// const initialState = {
//   currentTrack: null as NoMusicTrack | null,
//   isPlaying: false as boolean,
//   volume: 1,
//   currentTime: 0,
//   duration: 0,
//   queue: [] as NoMusicTrack[],
// };
