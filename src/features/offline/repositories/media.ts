import { CacheStorage } from "#offline/lib/cacheStorage";
import { errorResponse, successResponse } from "#responses";

/**
 * Media repository (Cache Storage layer)
 */
export const MediaRepo = {
  /**
   * Fetches media from network and caches it.
   */
  async cache(cacheKey: string, url: string,) {
    const response = await fetch(url);
    if (!response.ok) {
      return errorResponse([], `Failed to fetch media: ${response.status}`);
    }

    await CacheStorage.put(cacheKey, response);
    return successResponse(cacheKey);
  },

  /**
   * Get cached Response
   */
  get(cacheKey: string) {
    return CacheStorage.get(cacheKey);
  },

  /**
   * Get cached Blob (for audio/images usage)
   */
  async getBlob(cacheKey: string) {
    const res = await CacheStorage.get(cacheKey);
    if (!res.isSuccess) return errorResponse();

    return successResponse(res.data ? await res.data?.blob() : null);
  },

  /**
   * Check if media exists
   */
  has(cacheKey: string) {
    return CacheStorage.has(cacheKey);
  },

  /**
   * Delete one cached media file
   */
  del(cacheKey: string) {
    return CacheStorage.del(cacheKey);
  },

  /**
   * Clear all cached media
   */
  clear() {
    return CacheStorage.clear();
  },
};
