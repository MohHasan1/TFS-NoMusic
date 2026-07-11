import { OFFLINE_DB } from "#offline/constants";
import type { TLibraryOffline, TNomusicOffline, TUserOffline } from "#offline/types";

export type StoreSchemaMap = {
  nomusic: TNomusicOffline;
  libraries: TLibraryOffline;
  users: TUserOffline;
};

export const OFFLINE_DB_CONFIG = {
  stores: {
    [OFFLINE_DB.NOMUSIC_STORE]: {
      name: OFFLINE_DB.NOMUSIC_STORE,
      schema: {} as TNomusicOffline,
      indexes: [
        {
          name: OFFLINE_DB.DOWNLOADED_AT_INDEX,
          keyPath: "downloadedAt",
        },
      ],
    },

    [OFFLINE_DB.LIBRARY_STORE]: {
      name: OFFLINE_DB.LIBRARY_STORE,
      schema: {} as TLibraryOffline,
      indexes: [
        {
          name: OFFLINE_DB.DOWNLOADED_AT_INDEX,
          keyPath: "downloadedAt",
        },
      ],
    },

    [OFFLINE_DB.USER_STORE]: {
      name: OFFLINE_DB.USER_STORE,
      schema: {} as TUserOffline,
      indexes: [
        {
          name: OFFLINE_DB.DOWNLOADED_AT_INDEX,
          keyPath: "downloadedAt",
        },
      ],
    },
  },
} as const;

type Stores = typeof OFFLINE_DB_CONFIG.stores;
export type TStoreKey = keyof Stores;
type StoreConfig<K extends TStoreKey> = Stores[K];
export type TStoreRecord<K extends TStoreKey> = StoreConfig<K>["schema"];
