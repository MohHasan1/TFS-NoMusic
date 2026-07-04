import { create } from "zustand";
import { createSelectors } from "./selector";

import { createQueueSlice, TQueueSlice } from "#playback-queue/slice";
import { createPlayerSlice, TPlayerSlice } from "#playback-player/slice";
import { createRegistrySlice, TRegistrySlice } from "#playback-registry/slice";
import { createPlayerDialogSlice, TPlayerDialogSlice } from "#playback-dialog/slice";
import {
  createMessageQueueSlice,
  TMessageQueueSlice,
} from "#playback/modules/message-queue/slice";

export const useStore = create<TStore>()((...a) => ({
  ...createQueueSlice(...a),
  ...createPlayerSlice(...a),
  ...createRegistrySlice(...a),
  ...createPlayerDialogSlice(...a),
  ...createMessageQueueSlice(...a),
}));

export const store = createSelectors(useStore);
type TStore = TPlayerSlice & TRegistrySlice & TQueueSlice & TPlayerDialogSlice & TMessageQueueSlice;

// export type StoreState = ExtractState<typeof useStore>;
