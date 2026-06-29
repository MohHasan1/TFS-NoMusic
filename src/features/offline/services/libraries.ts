import { createLibraryCoverCacheKey } from "#offline/lib/cache-keys";
import { deleteOfflineLibrary, getOfflineLibraryById, saveOfflineLibrary } from "#offline/repositories/libraries";
import { cacheMedia, deleteCachedMedia } from "#offline/repositories/media";
import { downloadNomusic, removeNomusicDownload } from "#offline/services/nomusic";
import type { TLibraryOffline } from "#offline/types";
import type { TLibrary } from "#types/library";
import type { TNoMusic } from "#types/nomusic";

/**
 * Tracks active library downloads.
 *
 * Repeated clicks on the same library reuse the same Promise.
 * Different libraries can still download simultaneously.
 */
const activeLibraryDownloads = new Map<string, Promise<TLibraryOffline>>();

function createLibraryDownloadId(id: TLibrary["id"]): string {
  return String(id);
}

/**
 * Performs the complete library download workflow.
 */
async function performLibraryDownload(library: TLibrary, nomusic: readonly TNoMusic[]): Promise<TLibraryOffline> {
  const existingLibrary = await getOfflineLibraryById(library.id);
  if (existingLibrary) {
    return existingLibrary;
  }

  const coverCacheKey = createLibraryCoverCacheKey(library.id);

  try {
    // Cache the library cover when one is available.
    if (library.uploadedImageURL) {
      await cacheMedia(library.uploadedImageURL, coverCacheKey);
    }

    // Reuse the completed NoMusic download service.
    // Each song stores its audio, cover and IndexedDB metadata.
    const downloadedNomusic = await Promise.all(nomusic.map((record) => downloadNomusic(record)));

    const offlineLibrary: TLibraryOffline = {
      ...library,
      uploadedImageURL: library.uploadedImageURL ? coverCacheKey : undefined,
      nomusicIds: downloadedNomusic.map((record) => record.id),
      downloadedAt: Date.now(),
    };

    // Save the library only after all its songs finish downloading.
    await saveOfflineLibrary(offlineLibrary);

    return offlineLibrary;
  } catch (error) {
    // Remove the library cover if the workflow fails.
    await deleteCachedMedia(coverCacheKey).catch(() => {
      // Preserve the original download error.
    });

    /*
     * Do not delete successfully downloaded songs here.
     *
     * A song may already have been downloaded individually or may
     * belong to another offline library.
     */
    throw error;
  }
}

/**
 * Downloads one complete library for offline use.
 *
 * Repeated calls for the same library while it is downloading
 * return the existing Promise instead of starting duplicate work.
 */
export function downloadLibrary(library: TLibrary, nomusic: readonly TNoMusic[]): Promise<TLibraryOffline> {
  const downloadId = createLibraryDownloadId(library.id);

  const activeDownload = activeLibraryDownloads.get(downloadId);

  if (activeDownload) {
    return activeDownload;
  }

  const downloadPromise = performLibraryDownload(library, nomusic).finally(() => {
    activeLibraryDownloads.delete(downloadId);
  });

  activeLibraryDownloads.set(downloadId, downloadPromise);

  return downloadPromise;
}

/**
 * Removes an offline library.
 *
 * Deletes:
 * - library cover from Cache Storage
 * - library metadata from IndexedDB
 *
 * It does not delete the library's songs.
 */
export async function removeLibraryDownload(id: TLibraryOffline["id"]): Promise<void> {
  const downloadId = createLibraryDownloadId(id);

  if (activeLibraryDownloads.has(downloadId)) {
    throw new Error("This library is currently downloading.");
  }

  const coverCacheKey = createLibraryCoverCacheKey(id);

  await deleteCachedMedia(coverCacheKey);
  await deleteOfflineLibrary(id);
}

export async function removeLibraryDownloadWithNomusic(id: TLibraryOffline["id"], nomusicIds: readonly TNoMusic["id"][]): Promise<void> {
  await removeLibraryDownload(id);
  await Promise.allSettled(nomusicIds.map((nomusicId) => removeNomusicDownload(nomusicId)));
}
