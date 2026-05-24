import { combine } from "zustand/middleware";
import type { TNoMusic } from "#types/nomusic";

export const createRegistrySlice = combine(
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

export type TRegistrySlice = ReturnType<typeof createRegistrySlice>;

export type TRegistryState = {
  tracksById: Record<string, TNoMusic>;
};
