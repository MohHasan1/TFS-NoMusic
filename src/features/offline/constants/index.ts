export const OFFLINE_DB = {
  NAME: "nomusic-offline-db",
  VERSION: 1,

  NOMUSIC_STORE: "nomusic",
  LIBRARY_STORE: "libraries",
  DOWNLOADED_AT_INDEX: "by-downloaded-at",
} as const;

const ROOT_MEDIA_PATH = "/offline-media";

export const OFFLINE_STORAGE = {
  NAME: "nomusic-offline-storage",
  VERSION: 1,

  ROOT_PATH: ROOT_MEDIA_PATH,
  NOMUSIC_PATH: `${ROOT_MEDIA_PATH}/nomusic`,
  LIBRARY_PATH: `${ROOT_MEDIA_PATH}/libraries`,
} as const;


// // db: Indexed DB
// export const OFFLINE_DATABASE_NAME = "nomusic-offline";
// export const OFFLINE_DATABASE_VERSION = 1;

// // db: Store (table)
// export const OFFLINE_NOMUSIC_STORE = "nomusic";
// export const OFFLINE_LIBRARY_STORE = "libraries";

// // db: Indexes
// export const OFFLINE_DOWNLOADED_AT_INDEX = "by-downloaded-at" as const;

// // Cache: Cache storage
// export const OFFLINE_MEDIA_CACHE_NAME = "nomusic-offline-media";

// // Cache: Cache path
// export const OFFLINE_MEDIA_PATH = "/offline-media";

// export const OFFLINE_NOMUSIC_MEDIA_PATH = `${OFFLINE_MEDIA_PATH}/nomusic`;
// export const OFFLINE_LIBRARY_MEDIA_PATH = `${OFFLINE_MEDIA_PATH}/libraries`;