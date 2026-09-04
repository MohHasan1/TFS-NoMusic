import { create } from "zustand";
import { createPlaylistAddDialogSlice, type TPlaylistAddDialogSlice } from "#features/playlists/store/slice";
import { createMessageQueueSlice, type TMessageQueueSlice } from "#playback/modules/message-queue/slice";
import { createPlayerDialogSlice, type TPlayerDialogSlice } from "#playback-dialog/slice";
import { createPlayerSlice, type TPlayerSlice } from "#playback-player/slice";
import { createQueueSlice, type TQueueSlice } from "#playback-queue/slice";
import { createRegistrySlice, type TRegistrySlice } from "#playback-registry/slice";
import { createSelectors } from "./selector";

export const useStore = create<TStore>()((...a) => ({
  ...createQueueSlice(...a),
  ...createPlayerSlice(...a),
  ...createRegistrySlice(...a),
  ...createPlayerDialogSlice(...a),
  ...createMessageQueueSlice(...a),
  ...createPlaylistAddDialogSlice(...a),
}));

export const store = createSelectors(useStore);
type TStore = TPlayerSlice & TRegistrySlice & TQueueSlice & TPlayerDialogSlice & TMessageQueueSlice & TPlaylistAddDialogSlice;

// export type StoreState = ExtractState<typeof useStore>;
