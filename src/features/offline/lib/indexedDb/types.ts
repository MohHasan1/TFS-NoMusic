import type { IOFFLINE_DB_SCHEMA } from "#offline/schema";
import type { OFFLINE_DB_CONFIG } from "./config";
import type { IDBPTransaction } from "idb";

export type TOffline_Stores = keyof typeof OFFLINE_DB_CONFIG.stores;

export type TOffline_Schema_Transaction = IDBPTransaction<
  IOFFLINE_DB_SCHEMA,
  TOffline_Stores[],
  "versionchange"
>;
