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