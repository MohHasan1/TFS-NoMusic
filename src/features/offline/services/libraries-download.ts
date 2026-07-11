import { OfflineLibraries } from "#offline/repositories/libraries";
import { NomusicDownloadService } from "./nomusic-download";
import { successResponse, errorResponse } from "#responses";
import { CacheKey } from "#offline/lib/cacheStorage/keys";
import { MediaRepo } from "#offline/repositories/media";
import type { TLibraryOffline } from "#offline/types";
import type { TLibrary } from "#types/library";
import type { TNoMusic } from "#types/nomusic";

/**
 * Tracks active library downloads.
 */
const activeLibraryDownloads = new Map<string, ReturnType<typeof __performDownload>>();

export const LibrariesDownloadService = {
  download,
  remove,
};

/**
 * PUBLIC API
 */
export function download(library: TLibrary, nomusic: TNoMusic[]) {
  const downloadId = String(library.id);

  const active = activeLibraryDownloads.get(downloadId);
  if (active) return active;

  const promise = __performDownload(library, nomusic).finally(() => {
    activeLibraryDownloads.delete(downloadId);
  });

  activeLibraryDownloads.set(downloadId, promise);
  return promise;
}

/**
 * REMOVE LIBRARY
 */
export async function remove(id: TLibraryOffline["id"]) {
  const isdownloading = activeLibraryDownloads.has(String(id));
  if (isdownloading) {
    return errorResponse([], "Song is currently downloading.");
  }

  const library = await OfflineLibraries.getById(id);
  if (!library.isSuccess) {
    return library;
  }

  if (!library.data) {
    return successResponse(undefined);
  }

  const coverCacheKey = CacheKey.library.cover(id);

  await MediaRepo.del(coverCacheKey);
  await OfflineLibraries.remove(id);

  await Promise.allSettled(library.data.nomusicIds.map((id) => NomusicDownloadService.remove(id)));

  return successResponse(undefined);
}

/**
 * Core library download workflow.
 * Orchestrates cover caching + nomusic downloads + IndexedDB persistence.
 */
async function __performDownload(library: TLibrary, nomusic: TNoMusic[]) {
  const existing = await OfflineLibraries.getById(library.id);
  if (!existing.isSuccess) {
    return existing;
  }

  if (existing.data) {
    return successResponse(existing.data);
  }

  const coverCacheKey = CacheKey.library.cover(library.id);

  // 1. cache cover
  if (library.uploadedImageURL) {
    // const coverUrl = buildOfflineCloudflareImageUrl(library.uploadedImageURL);
    const coverRes = await MediaRepo.cache(coverCacheKey, library.uploadedImageURL);
    if (!coverRes.isSuccess) {
      return coverRes;
    }
  }

  // 2. download songs (reuse nomusic service)
  const nomusicRes = await Promise.all(nomusic.map((nm) => NomusicDownloadService.download(nm)));

  const nomusicIds: string[] = [];

  for (const r of nomusicRes) {
    // if any song failed
    if (!r.isSuccess) {
      await MediaRepo.del(coverCacheKey);
      return r;
    }

    nomusicIds.push(r.data.id);
  }

  const offlineLibrary: TLibraryOffline = {
    ...library,
    uploadedImageURL: library.uploadedImageURL ? coverCacheKey : undefined,
    nomusicIds: nomusicIds,
    downloadedAt: Date.now(),
  };

  const saveRes = await OfflineLibraries.save(offlineLibrary);
  if (!saveRes.isSuccess) {
    await MediaRepo.del(coverCacheKey);
    return saveRes;
  }

  return successResponse(offlineLibrary);
}
