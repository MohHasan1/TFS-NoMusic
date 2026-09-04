import { combine } from "zustand/middleware";

export const createPlaylistAddDialogSlice = combine(
  {
    playlistAddTrackId: null as string | null,
  },
  (set) => ({
    openPlaylistAddDialog: (trackId: string) => set({ playlistAddTrackId: trackId }),
    closePlaylistAddDialog: () => set({ playlistAddTrackId: null }),
  }),
);

export type TPlaylistAddDialogSlice = ReturnType<typeof createPlaylistAddDialogSlice>;
