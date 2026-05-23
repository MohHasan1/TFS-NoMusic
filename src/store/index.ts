import { create, type ExtractState } from "zustand";
import { createNowPlayingSlice, type TNowPlaying } from "@/modules/nowPlaying/slice.nowPlaying";
import { createNoMusicPlayerSlice, type TNoMusicPlayer } from "@/modules/player/slice";
import { createNoMusicQueueSlice, type TNoMusicQueue } from "@/modules/queue/slice";

import { createSelectors } from "./selector";
import { createTrackRegistrySlice, TTrackRegistry } from "@/modules/registry/slice";
import { TTrackQueue } from "../modules/queue/slices";
import { createTrackQueueSlice } from "../modules/queue/slices";

export const useStore = create<TStore>()((...a) => ({
  ...createNoMusicPlayerSlice(...a),
  ...createNoMusicQueueSlice(...a),
  ...createNowPlayingSlice(...a),
  ...createTrackRegistrySlice(...a),
  ...createTrackQueueSlice(...a),
}));

export const store = createSelectors(useStore);
type TStore = TNoMusicPlayer & TNoMusicQueue & TNowPlaying & TTrackRegistry & TTrackQueue;

// export type StoreState = ExtractState<typeof useStore>;
