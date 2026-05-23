import { combine } from "zustand/middleware";
import type { TNoMusic } from "#types/nomusic";

export const createTrackRegistrySlice = combine(
  {
    tracksById: {} as TRegistryState["tracksById"],
  },
  (set) => ({
    setTracksById: (tracksById: TRegistryState["tracksById"]) => {
      set({ tracksById });
    },

    clearRegistry: () => {
      set({
        tracksById: {},
      });
    },
  }),
);

export type TTrackRegistry = ReturnType<typeof createTrackRegistrySlice>;

export type TRegistryState = {
  tracksById: Record<string, TNoMusic>;
};
