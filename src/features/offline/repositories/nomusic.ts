import { OFFLINE_DOWNLOADED_AT_INDEX, OFFLINE_NOMUSIC_STORE } from "#features/offline/constants";
import { getIndexedDb } from "#offline/lib/indexed-db";
import type { TNomusicOffline } from "#offline/types";

/**
 * Returns all downloaded songs, newest first.
 */
export async function getOfflineNomusic(): Promise<TNomusicOffline[]> {
  const db = await getIndexedDb();

  // The downloadedAt index returns records oldest → newest.
  const records = await db.getAllFromIndex(OFFLINE_NOMUSIC_STORE, OFFLINE_DOWNLOADED_AT_INDEX);

  // Reverse the indexed result to show newest downloads first.
  return records.reverse();
}

/**
 * Returns one downloaded song by its ID.
 */
export async function getOfflineNomusicById(id: TNomusicOffline["id"]): Promise<TNomusicOffline | undefined> {
  const db = await getIndexedDb();

  return db.get(OFFLINE_NOMUSIC_STORE, id);
}

/**
 * Creates a downloaded-song record or updates the existing
 * record when another record has the same ID.
 */
export async function saveOfflineNomusic(record: TNomusicOffline): Promise<void> {
  const db = await getIndexedDb();

  await db.put(OFFLINE_NOMUSIC_STORE, record);
}

/**
 * Saves multiple downloaded songs in one transaction.
 */
export async function saveManyOfflineNomusic(records: readonly TNomusicOffline[]): Promise<void> {
  const db = await getIndexedDb();

  const transaction = db.transaction(OFFLINE_NOMUSIC_STORE, "readwrite");
  const store = transaction.objectStore(OFFLINE_NOMUSIC_STORE);

  // Wait for every write and for the transaction to commit.
  await Promise.all([...records.map((record) => store.put(record)), transaction.done]);
}

/**
 * Deletes one downloaded-song record by ID.
 *
 * This only deletes its IndexedDB metadata.
 * Audio and cover removal from Cache Storage will be
 * handled by a higher-level removal service later.
 */
export async function deleteOfflineNomusic(id: TNomusicOffline["id"]): Promise<void> {
  const db = await getIndexedDb();

  await db.delete(OFFLINE_NOMUSIC_STORE, id);
}

/**
 * Deletes every downloaded-song record from IndexedDB.
 *
 * This does not clear audio or covers from Cache Storage.
 */
export async function clearOfflineNomusic(): Promise<void> {
  const db = await getIndexedDb();

  await db.clear(OFFLINE_NOMUSIC_STORE);
}

/**
 * Checks whether a song record exists in IndexedDB.
 */
export async function isNomusicDownloaded(id: TNomusicOffline["id"]): Promise<boolean> {
  const db = await getIndexedDb();

  // Retrieve only the key because the complete song is not needed.
  const key = await db.getKey(OFFLINE_NOMUSIC_STORE, id);

  return key !== undefined;
}
