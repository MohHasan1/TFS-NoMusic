import { OFFLINE_STORAGE } from "#offline/constants";
import { checkCacheKeyPrefix, clearCacheStorage, openCacheStorage } from "./helpers";

export async function getCacheStorage() {
  return openCacheStorage(OFFLINE_STORAGE.NAME);
}

export async function deleteCacheStorage() {
  return clearCacheStorage(OFFLINE_STORAGE.NAME);
}

export function checkCacheKey(cacheKey: string) {
  return checkCacheKeyPrefix(OFFLINE_STORAGE.ROOT_PATH, cacheKey);
}
