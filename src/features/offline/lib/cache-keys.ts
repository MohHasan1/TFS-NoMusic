import { OFFLINE_LIBRARY_MEDIA_PATH, OFFLINE_NOMUSIC_MEDIA_PATH } from "#features/offline/constants";
import type { TLibrary } from "#types/library";
import type { TNoMusic } from "#types/nomusic";

function encodeCacheId(id: string | number): string {
  return encodeURIComponent(String(id));
}

export function createNomusicAudioCacheKey(id: TNoMusic["id"]): string {
  return `${OFFLINE_NOMUSIC_MEDIA_PATH}/${encodeCacheId(id)}/audio`;
}

export function createNomusicCoverCacheKey(id: TNoMusic["id"]): string {
  return `${OFFLINE_NOMUSIC_MEDIA_PATH}/${encodeCacheId(id)}/cover`;
}

export function createLibraryCoverCacheKey(id: TLibrary["id"]): string {
  return `${OFFLINE_LIBRARY_MEDIA_PATH}/${encodeCacheId(id)}/cover`;
}
