import { create, type ExtractState } from "zustand";

import { createSelectors } from "./selector";
import { TNoMusicPlayer, createNoMusicPlayerSlice } from "@/features/nomusic/noMusicPlayer/slice.noMusicPlayer";
import { TNoMusicQueue, createNoMusicQueueSlice } from "@/features/nomusic/noMusicQueue/slice.noMusicQueue";

export const useStore = create<TNoMusicPlayer & TNoMusicQueue>()((...a) => ({
  ...createNoMusicPlayerSlice(...a),
  ...createNoMusicQueueSlice(...a),
}));

export const store = createSelectors(useStore);

export type StoreState = ExtractState<typeof useStore>;
