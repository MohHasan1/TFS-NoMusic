import type { DBSchema } from "idb";

import { OFFLINE_DB } from "#offline/constants";
import { TNomusicOfflineStore } from "./nomusic";
import { TLibrariesOfflineStore } from "./libraries";

export interface IOFFLINE_DB_SCHEMA extends DBSchema {
  [OFFLINE_DB.NOMUSIC_STORE]: TNomusicOfflineStore;
  [OFFLINE_DB.LIBRARY_STORE]: TLibrariesOfflineStore;
}
