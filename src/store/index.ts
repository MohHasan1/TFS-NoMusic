import { create } from "zustand";
import { createPlayerSlice, type TPlayerSlice } from "@/modules/player/slice";

import { createSelectors } from "./selector";
import { createRegistrySlice, TRegistrySlice } from "@/modules/registry/slice";
import { createQueueSlice, TQueueSlice } from "#modules/queue/slice";

export const useStore = create<TStore>()((...a) => ({
  ...createPlayerSlice(...a),
  ...createRegistrySlice(...a),
  ...createQueueSlice(...a),
}));

export const store = createSelectors(useStore);
type TStore = TPlayerSlice & TRegistrySlice & TQueueSlice;

// export type StoreState = ExtractState<typeof useStore>;
