import { OFFLINE_STORAGE } from "#offline/constants";
import { encodeId } from "#offline/utils/id";

function buildKey(scope: string, id: string | number, type: string) {
  return `${scope}/${encodeId(id)}/${type}`;
}

export const CacheKey = {
  nomusic: {
    audio: (id: string | number) => buildKey(OFFLINE_STORAGE.NOMUSIC_PATH, id, "audio"),
    cover: (id: string | number) => buildKey(OFFLINE_STORAGE.NOMUSIC_PATH, id, "cover"),
  },
  library: {
    cover: (id: string | number) => buildKey(OFFLINE_STORAGE.LIBRARY_PATH, id, "cover"),
  },
};
