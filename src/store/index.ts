import { create, type ExtractState } from "zustand";
import { createNoMusicPlayerSlice, type TNoMusicPlayer } from "@/features/noMusicPlayer/slice.noMusicPlayer";
import { createSelectors } from "./selector";

export const useStore = create<TNoMusicPlayer>()((...a) => ({
  ...createNoMusicPlayerSlice(...a),
}));

export const store = createSelectors(useStore)

export type StoreState = ExtractState<typeof useStore>;
