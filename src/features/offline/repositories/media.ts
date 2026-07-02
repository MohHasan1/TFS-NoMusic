import { CacheStorage } from "#offline/lib/cacheStorage";
import { offlineTryCatch } from "#offline/utils/trycatch";
import { errorResponse, successResponse } from "#responses";

/**
 * Media repository (Cache Storage layer)
 */
export const MediaRepo = {
  /**
   * Fetches media from network and caches it.
   */
  async cache(cacheKey: string, url: string) {
    return offlineTryCatch(async () => {
      const response = await fetch(url);
      if (!response.ok) {
        return errorResponse([], `Failed to fetch media: ${response.status}`);
      }

      // Only store the complete resource.
      if (response.status !== 200) {
        return errorResponse([], `Failed to fetch complete media: ${response.status}`);
      }

      if (!response.body) {
        return errorResponse([], "Media response has no body.");
      }

      await CacheStorage.put(cacheKey, response);
      return successResponse(cacheKey);
    });
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
