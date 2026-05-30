import { create } from "zustand";
import { createSelectors } from "./selector";

import { createPlayerSlice, TPlayerSlice } from "#modules/player/slice";
import { createQueueSlice, TQueueSlice } from "#modules/queue/slice";
import { createRegistrySlice, TRegistrySlice } from "#modules/registry/slice";
import { createMessageQueueSlice, TMessageQueueSlice } from "#modules/message-queue/slice";

export const useStore = create<TStore>()((...a) => ({
  ...createPlayerSlice(...a),
  ...createRegistrySlice(...a),
  ...createQueueSlice(...a),
  ...createMessageQueueSlice(...a),
}));

export const store = createSelectors(useStore);
type TStore = TPlayerSlice & TRegistrySlice & TQueueSlice & TMessageQueueSlice;

// export type StoreState = ExtractState<typeof useStore>;
