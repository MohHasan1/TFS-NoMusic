import { OFFLINE_MEDIA_CACHE_NAME, OFFLINE_MEDIA_PATH } from "#features/offline/constants";

/**
 * Opens the media cache.
 */
export async function getMediaCache(): Promise<Cache> {
  assertCacheStorageSupport();

  // Reuses the cache when it exists or creates it when missing.
  return window.caches.open(OFFLINE_MEDIA_CACHE_NAME);
}

/**
 * Stores a response using a stable cache key.
 */
export async function putCachedResponse(cacheKey: string, response: Response): Promise<void> {
  assertCacheKey(cacheKey);

  const cache = await getMediaCache();

  // Clone the response so the original can still be consumed.
  await cache.put(cacheKey, response.clone());
}

/**
 * Retrieves a response from Cache Storage.
 */
export async function getCachedResponse(cacheKey: string): Promise<Response | null> {
  assertCacheKey(cacheKey);

  const cache = await getMediaCache();
  const response = await cache.match(cacheKey);

  // Use null instead of undefined for a clearer result.
  return response ?? null;
}

/**
 * Checks whether a cached response exists.
 */
export async function hasCachedResponse(cacheKey: string): Promise<boolean> {
  const response = await getCachedResponse(cacheKey);

  return response !== null;
}

/**
 * Deletes one cached response.
 */
export async function deleteCachedResponse(cacheKey: string): Promise<boolean> {
  assertCacheKey(cacheKey);

  const cache = await getMediaCache();

  // Returns true when an entry was deleted.
  return cache.delete(cacheKey);
}

/**
 * Deletes the complete media cache.
 */
export async function clearMediaCache(): Promise<boolean> {
  assertCacheStorageSupport();

  return window.caches.delete(OFFLINE_MEDIA_CACHE_NAME);
}

// -- HELPERS -- //
/**
 * Ensures Cache Storage is available in the current browser.
 */
function assertCacheStorageSupport(): void {
  // Prevent Cache Storage access during server rendering.
  if (typeof window === "undefined") {
    throw new Error("Cache Storage is only available in the browser.");
  }

  // Confirm that the browser supports Cache Storage.
  if (!("caches" in window)) {
    throw new Error("Cache Storage is not supported in this browser.");
  }
}

/**
 * Ensures the key belongs to the media cache namespace.
 */
function assertCacheKey(cacheKey: string): void {
  // Require keys to begin with "/offline-media/".
  const mediaCachePrefix = `${OFFLINE_MEDIA_PATH}/`;

  if (!cacheKey.startsWith(mediaCachePrefix)) {
    throw new Error(`Invalid cache key: ${cacheKey}`);
  }
}
