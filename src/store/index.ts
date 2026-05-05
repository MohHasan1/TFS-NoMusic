import { create, type ExtractState } from "zustand";
import { createNoMusicPlayerSlice, type TNoMusicPlayer } from "@/features/noMusicPlayer/slice.noMusicPlayer";
import { createNoMusicQueueSlice, type TNoMusicQueue } from "@/features/noMusicQueue/slice.noMusicQueue";
import { createSelectors } from "./selector";

export const useStore = create<TNoMusicPlayer & TNoMusicQueue>()((...a) => ({
  ...createNoMusicPlayerSlice(...a),
  ...createNoMusicQueueSlice(...a),
}));

export const store = createSelectors(useStore);

export type StoreState = ExtractState<typeof useStore>;
