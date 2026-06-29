// db: Indexed DB
export const OFFLINE_DATABASE_NAME = "nomusic-offline";
export const OFFLINE_DATABASE_VERSION = 1;

// db: Store (table)
export const OFFLINE_NOMUSIC_STORE = "nomusic";
export const OFFLINE_LIBRARY_STORE = "libraries";

// db: Indexes
export const OFFLINE_DOWNLOADED_AT_INDEX = "by-downloaded-at" as const;

// Cache: Cache storage
export const OFFLINE_MEDIA_CACHE_NAME = "nomusic-offline-media";

// Cache: Cache path
export const OFFLINE_MEDIA_PATH = "/offline-media";

export const OFFLINE_NOMUSIC_MEDIA_PATH = `${OFFLINE_MEDIA_PATH}/nomusic`;
export const OFFLINE_LIBRARY_MEDIA_PATH = `${OFFLINE_MEDIA_PATH}/libraries`;
