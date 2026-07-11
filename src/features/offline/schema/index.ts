import type { DBSchema } from "idb";

import { OFFLINE_DB } from "#offline/constants";
import type { TLibrariesOfflineStore } from "./libraries";
import type { TNomusicOfflineStore } from "./nomusic";
import type { TUserOfflineStore } from "./user";

export interface IOFFLINE_DB_SCHEMA extends DBSchema {
  [OFFLINE_DB.NOMUSIC_STORE]: TNomusicOfflineStore;
  [OFFLINE_DB.LIBRARY_STORE]: TLibrariesOfflineStore;
  [OFFLINE_DB.USER_STORE]: TUserOfflineStore;
}
