import { create } from "zustand";
import { createSelectors } from "./selector";

import { createQueueSlice, TQueueSlice } from "#modules/queue/slice";
import { createPlayerSlice, TPlayerSlice } from "#modules/player/slice";
import { createRegistrySlice, TRegistrySlice } from "#modules/registry/slice";
import { createMessageQueueSlice, TMessageQueueSlice } from "#modules/message-queue/slice";
import { createPlayerDialogSlice, TPlayerDialogSlice } from "#modules/player-dialog/slice";

export const useStore = create<TStore>()((...a) => ({
  ...createPlayerSlice(...a),
  ...createRegistrySlice(...a),
  ...createQueueSlice(...a),
  ...createMessageQueueSlice(...a),
  ...createPlayerDialogSlice(...a),
}));

export const store = createSelectors(useStore);
type TStore = TPlayerSlice & TRegistrySlice & TQueueSlice & TMessageQueueSlice & TPlayerDialogSlice;

// export type StoreState = ExtractState<typeof useStore>;
