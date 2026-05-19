import { create, type ExtractState } from "zustand";

import { createNoMusicPlayerSlice, type TNoMusicPlayer } from "#features/nomusic/player/slice";
import { createNoMusicQueueSlice, type TNoMusicQueue } from "#features/nomusic/queue/slice";
import { createNowPlayingSlice, type TNowPlaying } from "@/features/nomusic/nowPlaying/slice.nowPlaying";

import { createSelectors } from "./selector";

export const useStore = create<TNoMusicPlayer & TNoMusicQueue & TNowPlaying>()((...a) => ({
  ...createNoMusicPlayerSlice(...a),
  ...createNoMusicQueueSlice(...a),
  ...createNowPlayingSlice(...a),
}));

export const store = createSelectors(useStore);

export type StoreState = ExtractState<typeof useStore>;
