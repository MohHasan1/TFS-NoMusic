import type { DBSchema } from "idb";

import { OFFLINE_DOWNLOADED_AT_INDEX, OFFLINE_LIBRARY_STORE, OFFLINE_NOMUSIC_STORE } from "#features/offline/constants";
import type { TLibraryOffline, TNomusicOffline } from "#offline/types";

// Schema
export interface IOfflineDatabaseSchema extends DBSchema {
  [OFFLINE_NOMUSIC_STORE]: TOfflineNomusicStore;
  [OFFLINE_LIBRARY_STORE]: TOfflineLibraryStore;
}

// -- NoMusic
type TOfflineNomusicStore = {
  key: TNomusicOffline["id"];
  value: TNomusicOffline;
  indexes: {
    [OFFLINE_DOWNLOADED_AT_INDEX]: TNomusicOffline["downloadedAt"];
  };
};

// -- Libarary
type TOfflineLibraryStore = {
  key: TLibraryOffline["id"];
  value: TLibraryOffline;
  indexes: {
    [OFFLINE_DOWNLOADED_AT_INDEX]: TLibraryOffline["downloadedAt"];
  };
};
