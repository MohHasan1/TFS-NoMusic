import { successResponse } from "#responses";
import { checkCacheKey, deleteCacheStorage, getCacheStorage } from "./config";

export const CacheStorage = { put, get, has, del, clear };

/**
 * Stores a response using a stable cache key.
 */
export async function put(cacheKey: string, response: Response) {
  const cacheKeyRes = checkCacheKey(cacheKey);
  if (!cacheKeyRes.isSuccess) return cacheKeyRes;

  const cacheStorageRes = await getCacheStorage();
  if (!cacheStorageRes.isSuccess) return cacheStorageRes;

  const cacheStorage = cacheStorageRes.data;
  await cacheStorage.put(cacheKey, response.clone());

  return successResponse(undefined);
}

/**
 * Retrieves a response from Cache Storage.
 */
export async function get(cacheKey: string) {
  const cacheKeyRes = checkCacheKey(cacheKey);
  if (!cacheKeyRes.isSuccess) return cacheKeyRes;

  const cacheStorageRes = await getCacheStorage();
  if (!cacheStorageRes.isSuccess) return cacheStorageRes;

  const cacheStorage = cacheStorageRes.data;
  const res = await cacheStorage.match(cacheKey);

  if (!res) return successResponse(null, "Cache miss");
  return successResponse(res, "Cache hit");
}

/**
 * Checks whether a cached response exists.
 */
export async function has(cacheKey: string) {
  const res = await get(cacheKey);
  if (!res.isSuccess) return res;

  return successResponse(res.data !== null);
}

/**
 * Deletes one cached response.
 */
export async function del(cacheKey: string) {
  const keyRes = checkCacheKey(cacheKey);
  if (!keyRes.isSuccess) return keyRes;

  const cacheStorageRes = await getCacheStorage();
  if (!cacheStorageRes.isSuccess) return cacheStorageRes;

  const cacheStorage = cacheStorageRes.data;
  const deleted = await cacheStorage.delete(cacheKey);

  return successResponse(deleted);
}

/**
 * Clears the entire media cache.
 */
export async function clear() {
  return deleteCacheStorage();
}
