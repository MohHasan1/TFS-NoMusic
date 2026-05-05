import { combine } from "zustand/middleware";

export const createNoMusicPlayerSlice = combine(
  {
    currentTrack: null as NoMusicTrack | null,
    isPlaying: false as boolean,
    volume: 1,
    currentTime: 0,
    duration: 0,
    queue: [] as NoMusicTrack[],
  },
  (set, get) => ({
    setCurrentTrack: (track: NoMusicTrack) =>
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

    setTrackQueue: (tracks: NoMusicTrack[]) => set({ queue: tracks }),

    goToNextTrack: () => {
      const { queue, currentTrack } = get();
      if (!currentTrack || queue.length === 0) return;

      const i = queue.findIndex((t) => t.id === currentTrack.id);
      const next = queue[i + 1] ?? queue[0];

      if (next) {
        set({
          currentTrack: next,
          isPlaying: true,
          currentTime: 0,
        });
      }
    },

    goToPrevTrack: () => {
      const { queue, currentTrack } = get();
      if (!currentTrack || queue.length === 0) return;

      const i = queue.findIndex((t) => t.id === currentTrack.id);
      const prev = queue[i - 1] ?? queue[queue.length - 1];

      if (prev) {
        set({
          currentTrack: prev,
          isPlaying: true,
          currentTime: 0,
        });
      }
    },
  }),
);

export type TNoMusicPlayer = ReturnType<typeof createNoMusicPlayerSlice>;

export type NoMusicTrack = {
  id: string | number;
  title: string;
  streamUrl: string;
  artist?: string;
  coverImage?: string;
};

// const initialState = {
//   currentTrack: null as NoMusicTrack | null,
//   isPlaying: false as boolean,
//   volume: 1,
//   currentTime: 0,
//   duration: 0,
//   queue: [] as NoMusicTrack[],
// };
