import { OFFLINE_DOWNLOADED_AT_INDEX, OFFLINE_LIBRARY_STORE } from "#features/offline/constants";
import { getIndexedDb } from "#offline/lib/indexed-db";
import type { TLibraryOffline } from "#offline/types";

/**
 * Returns all downloaded libraries, newest first.
 */
export async function getOfflineLibraries(): Promise<TLibraryOffline[]> {
  const database = await getIndexedDb();

  // The downloadedAt index returns records oldest → newest.
  const records = await database.getAllFromIndex(OFFLINE_LIBRARY_STORE, OFFLINE_DOWNLOADED_AT_INDEX);

  // Reverse the indexed result to show newest downloads first.
  return records.reverse();
}

/**
 * Returns one downloaded library by its ID.
 */
export async function getOfflineLibraryById(id: TLibraryOffline["id"]): Promise<TLibraryOffline | undefined> {
  const database = await getIndexedDb();

  return database.get(OFFLINE_LIBRARY_STORE, id);
}

/**
 * Creates a downloaded-library record or updates the
 * existing record when it has the same ID.
 */
export async function saveOfflineLibrary(record: TLibraryOffline): Promise<void> {
  const database = await getIndexedDb();

  await database.put(OFFLINE_LIBRARY_STORE, record);
}

/**
 * Saves multiple downloaded libraries in one transaction.
 */
export async function saveManyOfflineLibraries(records: readonly TLibraryOffline[]): Promise<void> {
  const database = await getIndexedDb();

  const transaction = database.transaction(OFFLINE_LIBRARY_STORE, "readwrite");

  const store = transaction.objectStore(OFFLINE_LIBRARY_STORE);

  // Wait for every write and for the transaction to commit.
  await Promise.all([...records.map((record) => store.put(record)), transaction.done]);
}

/**
 * Deletes one library record from IndexedDB.
 *
 * This only removes the library metadata.
 * Its cached cover and downloaded songs are handled separately.
 */
export async function deleteOfflineLibrary(id: TLibraryOffline["id"]): Promise<void> {
  const database = await getIndexedDb();

  await database.delete(OFFLINE_LIBRARY_STORE, id);
}

/**
 * Deletes every downloaded-library record from IndexedDB.
 *
 * This does not remove cached covers or downloaded songs.
 */
export async function clearOfflineLibraries(): Promise<void> {
  const database = await getIndexedDb();

  await database.clear(OFFLINE_LIBRARY_STORE);
}

/**
 * Checks whether a library record exists in IndexedDB.
 */
export async function isLibraryDownloaded(id: TLibraryOffline["id"]): Promise<boolean> {
  const database = await getIndexedDb();

  // Only retrieve the key because the complete library is not needed.
  const key = await database.getKey(OFFLINE_LIBRARY_STORE, id);

  return key !== undefined;
}
