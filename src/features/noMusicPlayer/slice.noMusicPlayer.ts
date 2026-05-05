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
    play: (track: NoMusicTrack) =>
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

    pause: () => set({ isPlaying: false }),

    toggle: () => set((s) => ({ isPlaying: !s.isPlaying })),

    setVolume: (volume: number) => set({ volume }),

    setTime: (currentTime: number) => set({ currentTime }),

    setDuration: (duration: number) => set({ duration }),

    setQueue: (tracks: NoMusicTrack[]) => set({ queue: tracks }),

    next: () => {
      const { queue, currentTrack } = get();
      if (!currentTrack) return;

      const i = queue.findIndex((t) => t.id === currentTrack.id);
      const next = queue[i + 1];

      if (next) {
        set({
          currentTrack: next,
          isPlaying: true,
          currentTime: 0,
        });
        return;
      }

      set({ isPlaying: false });
    },

    prev: () => {
      const { queue, currentTrack } = get();
      if (!currentTrack) return;

      const i = queue.findIndex((t) => t.id === currentTrack.id);
      const prev = queue[i - 1];

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
