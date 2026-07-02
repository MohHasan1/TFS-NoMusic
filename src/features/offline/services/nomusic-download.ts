
import { OfflineNomusic } from "#offline/repositories/nomusic";
import { successResponse, errorResponse } from "#responses";
import { CacheKey } from "#offline/lib/cacheStorage/keys";
import { MediaRepo } from "#offline/repositories/media";
import type { TNomusicOffline } from "#offline/types";
import type { TNoMusic } from "#types/nomusic";

const activeDownloads = new Map<string, ReturnType<typeof __performDownload>>();

export const NomusicDownloadService = {
  download,
  remove,
};

/**
 * Downloads a song for offline playback.
 * Prevents duplicate downloads while one is already in progress.
 *
 * @returns A Promise that resolves to the downloaded offline song record.
 * If a download is already in progress for the same song, the same Promise is returned.
 */
function download(nomusic: TNoMusic) {
  const downloadId = String(nomusic.id);

  const activeDownload = activeDownloads.get(downloadId);
  if (activeDownload) {
    return activeDownload;
  }

  const promise = __performDownload(nomusic).finally(() => {
    activeDownloads.delete(downloadId);
  });

  activeDownloads.set(downloadId, promise);
  return promise;
}

/**
 * Removes a downloaded song and its cached media.
 */
async function remove(id: TNomusicOffline["id"]) {
  const isdownloading = activeDownloads.has(String(id));
  if (isdownloading) {
    return errorResponse([], "Song is currently downloading.");
  }

  const record = await OfflineNomusic.getById(id);
  if (!record.isSuccess) {
    return record;
  }

  if (!record.data) {
    return successResponse(undefined);
  }

  const audioCacheKey = CacheKey.nomusic.audio(id);
  const coverCacheKey = CacheKey.nomusic.cover(id);

  await Promise.allSettled([MediaRepo.del(audioCacheKey), MediaRepo.del(coverCacheKey)]);

  return OfflineNomusic.remove(id);
}

/**
 * Performs the actual download workflow:
 * - checks existing DB record
 * - caches media files
 * - saves IndexedDB record
 */
async function __performDownload(nomusic: TNoMusic) {
  const existing = await OfflineNomusic.getById(nomusic.id);
  if (!existing.isSuccess) {
    return existing;
  }

  // Already downloaded
  if (existing.data) {
    return successResponse(existing.data);
  }

  if (!nomusic.audioStreamUrl) {
    return errorResponse([], "No audio URL available.");
  }

  const audioCacheKey = CacheKey.nomusic.audio(nomusic.id);
  const coverCacheKey = CacheKey.nomusic.cover(nomusic.id);

  const audioRes = await MediaRepo.cache(audioCacheKey, nomusic.audioStreamUrl);
  if (!audioRes.isSuccess) {
    return audioRes;
  }

  if (nomusic.coverImage) {
    // const coverUrl = buildOfflineCloudflareImageUrl(nomusic.coverImage);
    const coverRes = await MediaRepo.cache(coverCacheKey, nomusic.coverImage);
    if (!coverRes.isSuccess) {
      await MediaRepo.del(audioCacheKey);
      return coverRes;
    }
  }

  const record: TNomusicOffline = {
    ...nomusic,
    audioStreamUrl: audioCacheKey,
    coverImage: nomusic.coverImage ? coverCacheKey : null,
    downloadedAt: Date.now(),
  };

  const saveRes = await OfflineNomusic.save(record);
  if (!saveRes.isSuccess) {
    await Promise.allSettled([MediaRepo.del(audioCacheKey), MediaRepo.del(coverCacheKey)]);
    return saveRes;
  }

  return successResponse(record);
}
