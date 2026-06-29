import type { IDBPDatabase, IDBPTransaction } from "idb";
import { openDB } from "idb";
import { OFFLINE_DATABASE_NAME, OFFLINE_DATABASE_VERSION, OFFLINE_DOWNLOADED_AT_INDEX, OFFLINE_LIBRARY_STORE, OFFLINE_NOMUSIC_STORE } from "#features/offline/constants";
import type { IOfflineDatabaseSchema } from "../schema";

type TOfflineUpgradeStores = [typeof OFFLINE_NOMUSIC_STORE, typeof OFFLINE_LIBRARY_STORE];
type TOfflineUpgradeTransaction = IDBPTransaction<IOfflineDatabaseSchema, TOfflineUpgradeStores, "versionchange">;

let indexedDbPromise: Promise<IDBPDatabase<IOfflineDatabaseSchema>> | null = null;

// -- This is the main function used whenever another service needs IndexedDB.
export function getIndexedDb(): Promise<IDBPDatabase<IOfflineDatabaseSchema>> {
  assertIndexedDBSupport();

  if (indexedDbPromise) {
    return indexedDbPromise;
  }

  indexedDbPromise = openDB<IOfflineDatabaseSchema>(OFFLINE_DATABASE_NAME, OFFLINE_DATABASE_VERSION, {
    upgrade(database, _oldVersion, _newVersion, transaction) {
      // NoMusic
      if (!database.objectStoreNames.contains(OFFLINE_NOMUSIC_STORE)) {
        createNomusicStore(database);
      } else {
        ensureNomusicStoreIndexes(transaction);
      }

      // Library
      if (!database.objectStoreNames.contains(OFFLINE_LIBRARY_STORE)) {
        createLibraryStore(database);
      } else {
        ensureLibraryStoreIndexes(transaction);
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

// ----- HELPERS ------- //

// 1- This function checks whether IndexedDB can safely be used before we try opening the database.
function assertIndexedDBSupport(): void {
  if (typeof window === "undefined") {
    throw new Error("Offline IndexedDB is only available in the browser.");
  }

  if (!("indexedDB" in window)) {
    throw new Error("IndexedDB is not supported in this browser.");
  }
}

// 2- It makes sure the existing NoMusic object store has the required downloadedAt index.
function ensureNomusicStoreIndexes(transaction: TOfflineUpgradeTransaction): void {
  const store = transaction.objectStore(OFFLINE_NOMUSIC_STORE);

  if (!store.indexNames.contains(OFFLINE_DOWNLOADED_AT_INDEX)) {
    store.createIndex(OFFLINE_DOWNLOADED_AT_INDEX, "downloadedAt");
  }
}

// 3- It makes sure the existing Library object store has the required downloadedAt index.
function ensureLibraryStoreIndexes(transaction: TOfflineUpgradeTransaction): void {
  const store = transaction.objectStore(OFFLINE_LIBRARY_STORE);

  if (!store.indexNames.contains(OFFLINE_DOWNLOADED_AT_INDEX)) {
    store.createIndex(OFFLINE_DOWNLOADED_AT_INDEX, "downloadedAt");
  }
}

// 4- create Nomusic object store and required downloadedAt index.
function createNomusicStore(database: IDBPDatabase<IOfflineDatabaseSchema>): void {
  const store = database.createObjectStore(OFFLINE_NOMUSIC_STORE, {
    keyPath: "id",
  });

  store.createIndex(OFFLINE_DOWNLOADED_AT_INDEX, "downloadedAt");
}

// 4- create Librray object store and required downloadedAt index.
function createLibraryStore(database: IDBPDatabase<IOfflineDatabaseSchema>): void {
  const store = database.createObjectStore(OFFLINE_LIBRARY_STORE, {
    keyPath: "id",
  });

  store.createIndex(OFFLINE_DOWNLOADED_AT_INDEX, "downloadedAt");
}
