import { TOffline_Schema_Transaction, TOffline_Stores } from "./types";
import { errorResponse, successResponse } from "#responses";
import { IOFFLINE_DB_SCHEMA } from "#offline/schema";
import { OFFLINE_DB_CONFIG } from "./config";

import { IDBPDatabase } from "idb";

/**
 * Ensures IndexedDB is available in the browser.
 */
export function checkIndexedDB() {
  if (typeof window === "undefined") {
    return errorResponse([], "IndexedDB is only available in the browser.");
  }

  if (!("indexedDB" in window)) {
    return errorResponse([], "IndexedDB is not supported in this browser.");
  }

  return successResponse(undefined);
}

/**
 * - Ensures NoMusic store has required indexes during DB upgrade.
 * - Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
 */
export function ensureStoreIndexes(tx: TOffline_Schema_Transaction, storeKey: TOffline_Stores) {
  const config = OFFLINE_DB_CONFIG.stores[storeKey];

  const store = tx.objectStore(config.name);

  for (const index of config.indexes) {
    if (!store.indexNames.contains(index.name)) {
      store.createIndex(index.name, index.keyPath);
    }
  }
}

/**
 * - Creates an object store and its default index.
 * - Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
 */
export function createStore(db: IDBPDatabase<IOFFLINE_DB_SCHEMA>, storeKey: TOffline_Stores) {
  const config = OFFLINE_DB_CONFIG.stores[storeKey];

  // SAFE GUARD (good to keep)
  if (db.objectStoreNames.contains(config.name)) return;
  
  const store = db.createObjectStore(config.name, {
    keyPath: "id",
  });

  for (const index of config.indexes) {
    store.createIndex(index.name, index.keyPath);
  }
}
