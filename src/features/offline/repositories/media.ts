import { clearMediaCache, deleteCachedResponse, getCachedResponse, hasCachedResponse, putCachedResponse } from "#offline/lib/cache-storage";

/**
 * Fetches a media file and stores it in Cache Storage.
 */
export async function cacheMedia(url: string, cacheKey: string): Promise<string> {
  // The media server must allow this app's origin through CORS.
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch media: ${response.status} ${response.statusText}`);
  }

  // putCachedResponse() clones the response internally.
  await putCachedResponse(cacheKey, response);

  return cacheKey;
}

/**
 * Returns the complete cached Response.
 */
export async function getCachedMediaResponse(cacheKey: string): Promise<Response | null> {
  return getCachedResponse(cacheKey);
}

/**
 * Returns the cached media body as a Blob.
 */
export async function getCachedMediaBlob(cacheKey: string): Promise<Blob | null> {
  const response = await getCachedResponse(cacheKey);

  if (!response) {
    return null;
  }

  return response.blob();
}

/**
 * Checks whether media exists under the given cache key.
 */
export async function hasCachedMedia(cacheKey: string): Promise<boolean> {
  return hasCachedResponse(cacheKey);
}

/**
 * Deletes one media file from Cache Storage.
 */
export async function deleteCachedMedia(cacheKey: string): Promise<boolean> {
  return deleteCachedResponse(cacheKey);
}

/**
 * Deletes the complete media cache.
 */
export async function clearCachedMedia(): Promise<boolean> {
  return clearMediaCache();
}
