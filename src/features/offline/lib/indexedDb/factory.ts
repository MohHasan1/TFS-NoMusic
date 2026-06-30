import { TStoreRecord, TStoreKey } from "./config";
import { offlineTryCatch } from "#offline/utils/trycatch";
import { OFFLINE_DB } from "#offline/constants";
import { getIndexedDb } from ".";

export function createOfflineRepo<K extends TStoreKey>(storeName: K) {
  return {
    /**
     * Get all downloaded records (newest first)
     */
    getAll() {
      return offlineTryCatch(async () => {
        const db = await getIndexedDb();

        const records = await db.getAllFromIndex(storeName, OFFLINE_DB.DOWNLOADED_AT_INDEX);
        return records.reverse();
      });
    },

    /**
     * Get single record by id
     */
    getById(id: TStoreRecord<K>["id"]) {
      return offlineTryCatch(async () => {
        const db = await getIndexedDb();
        return db.get(storeName, id);
      });
    },

    /**
     * Save or update one record
     */
    save(record: TStoreRecord<K>) {
      return offlineTryCatch(async () => {
        const db = await getIndexedDb();
        await db.put(storeName, record);
      });
    },

    /**
     * Save multiple records
     */
    saveMany(records: readonly TStoreRecord<K>[]) {
      return offlineTryCatch(async () => {
        const db = await getIndexedDb();

        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);

        await Promise.all([...records.map((r) => store.put(r)), tx.done]);
      });
    },

    /**
     * Delete one record
     *
     * This only deletes its IndexedDB metadata.
     * Audio and cover removal from Cache Storage will be
     * handled by a higher-level removal service later.
     */
    remove(id: TStoreRecord<K>["id"]) {
      return offlineTryCatch(async () => {
        const db = await getIndexedDb();
        await db.delete(storeName, id);
      });
    },

    /**
     * Deletes every downloaded record from IndexedDB.
     *
     * This does not clear audio or covers from Cache Storage.
     */
    clear() {
      return offlineTryCatch(async () => {
        const db = await getIndexedDb();
        await db.clear(storeName);
      });
    },

    /**
     * Check if downloaded
     */
    isDownloaded(id: TStoreRecord<K>["id"]) {
      return offlineTryCatch(async () => {
        const db = await getIndexedDb();
        const key = await db.getKey(storeName, id);
        return key !== undefined;
      });
    },
  };
}
