import { createNomusicAudioCacheKey, createNomusicCoverCacheKey } from "#offline/lib/cache-keys";
import { cacheMedia, deleteCachedMedia } from "#offline/repositories/media";
import {
  deleteOfflineNomusic,
  getOfflineNomusicById,
  saveOfflineNomusic,
} from "#offline/repositories/nomusic";
import type { TNomusicOffline } from "#offline/types";
import type { TNoMusic } from "#types/nomusic";

const activeNomusicDownloads = new Map<string, Promise<TNomusicOffline>>();

function createDownloadId(id: TNoMusic["id"]) {
  return String(id);
}

async function performNomusicDownload(nomusic: TNoMusic): Promise<TNomusicOffline> {
  const existingRecord = await getOfflineNomusicById(nomusic.id);

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

    if (nomusic.coverImage) {
      mediaOperations.push(cacheMedia(nomusic.coverImage, coverCacheKey));
    }

    await Promise.all(mediaOperations);

    const offlineRecord: TNomusicOffline = {
      ...nomusic,
      audioStreamUrl: audioCacheKey,
      coverImage: nomusic.coverImage ? coverCacheKey : null,
      downloadedAt: Date.now(),
    };

    await saveOfflineNomusic(offlineRecord);

    return offlineRecord;
  } catch (error) {
    await Promise.allSettled([deleteCachedMedia(audioCacheKey), deleteCachedMedia(coverCacheKey)]);
    throw error;
  }
}

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

export async function removeNomusicDownload(id: TNomusicOffline["id"]): Promise<void> {
  const downloadId = createDownloadId(id);
  const activeDownload = activeNomusicDownloads.get(downloadId);

  if (activeDownload) {
    throw new Error("This song is currently downloading.");
  }

  const audioCacheKey = createNomusicAudioCacheKey(id);
  const coverCacheKey = createNomusicCoverCacheKey(id);

  await Promise.all([deleteCachedMedia(audioCacheKey), deleteCachedMedia(coverCacheKey)]);
  await deleteOfflineNomusic(id);
}
