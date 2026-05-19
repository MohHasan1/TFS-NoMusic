import { create, type ExtractState } from "zustand";
import { createNowPlayingSlice, type TNowPlaying } from "@/modules/nowPlaying/slice.nowPlaying";
import { createNoMusicPlayerSlice, type TNoMusicPlayer } from "@/modules/player/slice";
import { createNoMusicQueueSlice, type TNoMusicQueue } from "@/modules/queue/slice";

import { createSelectors } from "./selector";

export const useStore = create<TNoMusicPlayer & TNoMusicQueue & TNowPlaying>()((...a) => ({
  ...createNoMusicPlayerSlice(...a),
  ...createNoMusicQueueSlice(...a),
  ...createNowPlayingSlice(...a),
}));

export const store = createSelectors(useStore);

export type StoreState = ExtractState<typeof useStore>;
