import { create } from "zustand";
import { createNowPlayingSlice, type TNowPlaying } from "@/modules/nowPlaying/slice.nowPlaying";
import { createPlayerSlice, type TPlayerSlice } from "@/modules/player/slice";

import { createSelectors } from "./selector";
import { createRegistrySlice, TRegistrySlice } from "@/modules/registry/slice";
import { createQueueSlice, TQueueSlice } from "#modules/queue/slice";

export const useStore = create<TStore>()((...a) => ({
  ...createPlayerSlice(...a),
  ...createRegistrySlice(...a),
  ...createQueueSlice(...a),
  ...createNowPlayingSlice(...a),
}));

export const store = createSelectors(useStore);
type TStore = TPlayerSlice & TRegistrySlice & TQueueSlice & TNowPlaying;

// export type StoreState = ExtractState<typeof useStore>;
