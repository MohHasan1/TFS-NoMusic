import { checkIndexedDB, createStore, ensureStoreIndexes } from "./helpers";
import { IOFFLINE_DB_SCHEMA } from "#offline/schema";
import { OFFLINE_DB } from "#offline/constants";
import { OFFLINE_DB_CONFIG } from "./config";
import { TOffline_Stores } from "./types";

import type { IDBPDatabase } from "idb";
import { openDB } from "idb";

let indexedDbPromise: Promise<IDBPDatabase<IOFFLINE_DB_SCHEMA>> | null = null;

/**
 * Main entry point for IndexedDB access.
 * Creates singleton DB connection.
 */
export function getIndexedDb(): Promise<IDBPDatabase<IOFFLINE_DB_SCHEMA>> {
  const res = checkIndexedDB();
  if (!res.isSuccess) {
    return Promise.reject(res);
  }

  if (indexedDbPromise) {
    return indexedDbPromise;
  }

  indexedDbPromise = openDB<IOFFLINE_DB_SCHEMA>(OFFLINE_DB.NAME, OFFLINE_DB.VERSION, {
    upgrade(db, _oldVersion, _newVersion, tx) {
      for (const key of Object.keys(OFFLINE_DB_CONFIG.stores) as TOffline_Stores[]) {
        const storeConfig = OFFLINE_DB_CONFIG.stores[key];

        // Create store if missing
        if (!db.objectStoreNames.contains(storeConfig.name)) {
          createStore(db, storeConfig.name);
        }

        // ENSURE indexes if store already exists
        else {
          ensureStoreIndexes(tx, storeConfig.name);
        }
      }
    },

    blocking() {
      indexedDbPromise = null;
    },

    terminated() {
      indexedDbPromise = null;
    },
  }).catch((error: unknown) => {
    indexedDbPromise = null;
    throw error;
  });

  return indexedDbPromise;
}
