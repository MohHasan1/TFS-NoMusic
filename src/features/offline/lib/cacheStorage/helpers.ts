import { errorResponse, successResponse } from "#responses";

/**
 * Opens the single cache instance (given the instance name)
 */
export async function openCacheStorage(name: string) {
  const res = checkCacheStorage();
  if (!res.isSuccess) return res;

  // Reuses the cache when it exists or creates it when missing.
  const cache = await window.caches.open(name);

  return successResponse(cache);
}

/**
 * Clears the entire cache instance (given the instance name)
 */
export async function clearCacheStorage(name: string) {
  const deleted = await window.caches.delete(name);
  return successResponse(deleted);
}

/**
 * Ensures Cache Storage is available in the current browser.
 */
export function checkCacheStorage() {
  if (typeof window === "undefined") {
    return errorResponse([], "Cache Storage is only available in the browser.");
  }

  if (!("caches" in window)) {
    return errorResponse([], "Cache Storage is not supported in this browser.");
  }

  return successResponse(undefined);
}

/**
 * Ensures the key has the correct prefix
 */
export function checkCacheKeyPrefix(prefix: string, cacheKey: string) {
  const mediaCachePrefix = `${prefix}/`;

  if (!cacheKey.startsWith(mediaCachePrefix)) {
    return errorResponse([], `Invalid cache key: ${cacheKey}`);
  }

  return successResponse(undefined);
}
