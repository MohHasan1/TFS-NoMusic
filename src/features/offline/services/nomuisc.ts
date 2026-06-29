import { createNomusicAudioCacheKey, createNomusicCoverCacheKey } from "#offline/lib/cache-keys";
import { deleteCachedMedia, cacheMedia } from "#offline/repositories/media";
import {
  deleteOfflineNomusic,
  getOfflineNomusicById,
  saveOfflineNomusic,
} from "#offline/repositories/nomusic";
import type { TNomusicOffline } from "#offline/types";
import type { TNoMusic } from "#types/nomusic";

/**
 * Tracks active downloads by song ID.
 *
 * Multiple clicks on the same song reuse the same Promise,
 * while different songs can download at the same time.
 */
const activeNomusicDownloads = new Map<string, Promise<TNomusicOffline>>();

function createDownloadId(id: TNoMusic["id"]): string {
  return String(id);
}

/**
 * Performs the actual NoMusic download workflow.
 */
async function performNomusicDownload(nomusic: TNoMusic): Promise<TNomusicOffline> {
  const existingRecord = await getOfflineNomusicById(nomusic.id);

  // Return the existing record instead of downloading it again.
  if (existingRecord) {
    return existingRecord;
  }

  if (!nomusic.audioStreamUrl) {
    throw new Error(`No audio URL is available for "${nomusic.name}".`);
  }

  const audioCacheKey = createNomusicAudioCacheKey(nomusic.id);

  const coverCacheKey = createNomusicCoverCacheKey(nomusic.id);

  try {
    const mediaOperations: Promise<string>[] = [cacheMedia(nomusic.audioStreamUrl, audioCacheKey)];

    // The cover is optional, so cache it only when available.
    if (nomusic.coverImage) {
      mediaOperations.push(cacheMedia(nomusic.coverImage, coverCacheKey));
    }

    // Audio and cover can download at the same time.
    await Promise.all(mediaOperations);

    const offlineRecord: TNomusicOffline = {
      ...nomusic,
      downloadedAt: Date.now(),
    };

    // Metadata is stored only after all required media succeeds.
    await saveOfflineNomusic(offlineRecord);

    return offlineRecord;
  } catch (error) {
    // Remove any files that may have been cached before failure.
    await Promise.allSettled([deleteCachedMedia(audioCacheKey), deleteCachedMedia(coverCacheKey)]);

    throw error;
  }
}

/**
 * Downloads one song for offline use.
 *
 * Repeated calls for the same song while it is downloading
 * return the same Promise instead of starting duplicate fetches.
 */
export function downloadNomusic(nomusic: TNoMusic): Promise<TNomusicOffline> {
  const downloadId = createDownloadId(nomusic.id);
  const activeDownload = activeNomusicDownloads.get(downloadId);

  if (activeDownload) {
    return activeDownload;
  }

  const downloadPromise = performNomusicDownload(nomusic).finally(() => {
    activeNomusicDownloads.delete(downloadId);
  });

  activeNomusicDownloads.set(downloadId, downloadPromise);

  return downloadPromise;
}

/**
 * Completely removes one downloaded song.
 *
 * Deletes the audio, cover and IndexedDB metadata.
 */
export async function removeNomusicDownload(id: TNomusicOffline["id"]): Promise<void> {
  const downloadId = createDownloadId(id);
  const activeDownload = activeNomusicDownloads.get(downloadId);

  // Do not remove a song in the middle of writing its files.
  if (activeDownload) {
    throw new Error("This song is currently downloading.");
  }

  const audioCacheKey = createNomusicAudioCacheKey(id);

  const coverCacheKey = createNomusicCoverCacheKey(id);

  await Promise.all([deleteCachedMedia(audioCacheKey), deleteCachedMedia(coverCacheKey)]);

  await deleteOfflineNomusic(id);
}
