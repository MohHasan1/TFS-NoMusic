import type { TLibrary } from "#types/library";
import type { TNoMusic } from "#types/nomusic";

export type TOfflineLibraryUi = TLibrary & {
  tracks: TNoMusic[];
};

const TRACKS: TNoMusic[] = [
  {
    id: "offline-track-1",
    name: "Velvet Echo",
    artist: "NoMusic",
    language: "english",
    uploadedAt: "2026-06-29T09:00:00.000Z",
    duration: 164,
    coverImage: "/web-app-manifest-512x512.png",
    audioStreamUrl: "/nomusic.svg",
  },
  {
    id: "offline-track-2",
    name: "Moonlit Dua",
    artist: "Hasan",
    language: "arabic",
    uploadedAt: "2026-06-28T09:00:00.000Z",
    duration: 186,
    coverImage: null,
    audioStreamUrl: "/nomusic.svg",
  },
  {
    id: "offline-track-3",
    name: "Shonar Raat",
    artist: "NoMusic",
    language: "bangla",
    uploadedAt: "2026-06-27T09:00:00.000Z",
    duration: 154,
    coverImage: "/web-app-manifest-192x192.png",
    audioStreamUrl: "/nomusic.svg",
  },
  {
    id: "offline-track-4",
    name: "City Rain",
    artist: "M Hasan",
    language: "english",
    uploadedAt: "2026-06-26T09:00:00.000Z",
    duration: 172,
    coverImage: null,
    audioStreamUrl: "/nomusic.svg",
  },
  {
    id: "offline-track-5",
    name: "Silsila",
    artist: "NoMusic",
    language: "hindi",
    uploadedAt: "2026-06-25T09:00:00.000Z",
    duration: 201,
    coverImage: "/pwa/icon.png",
    audioStreamUrl: "/nomusic.svg",
  },
  {
    id: "offline-track-6",
    name: "Glass Horizon",
    artist: "Vocal Room",
    language: "others",
    uploadedAt: "2026-06-24T09:00:00.000Z",
    duration: 144,
    coverImage: null,
    audioStreamUrl: "/nomusic.svg",
  },
] as const;

export const OFFLINE_NOMUSIC_UI_ITEMS = TRACKS;

export const OFFLINE_LIBRARY_UI_ITEMS: TOfflineLibraryUi[] = [
  {
    id: "offline-library-album",
    name: "After Midnight",
    slug: "after-midnight",
    author: "NoMusic",
    description: "A polished album-style collection for quiet, late-night listening.",
    type: "album",
    updatedAt: "2026-06-29T12:00:00.000Z",
    trackCount: 3,
    uploadedImageURL: "/web-app-manifest-512x512.png",
    tracks: [TRACKS[0], TRACKS[1], TRACKS[2]],
  },
  {
    id: "offline-library-user",
    name: "Saved for Flights",
    slug: "saved-for-flights",
    author: "Mohammed Hasan",
    description: "A personal mix of reliable downloads ready for long offline sessions.",
    type: "user",
    updatedAt: "2026-06-28T12:00:00.000Z",
    trackCount: 2,
    uploadedImageURL: null,
    tracks: [TRACKS[3], TRACKS[4]],
  },
  {
    id: "offline-library-language",
    name: "Bangla Voices",
    slug: "bangla-voices",
    author: "NoMusic",
    description: "A language-based shelf focused on warm Bangla vocal textures.",
    type: "language",
    updatedAt: "2026-06-27T12:00:00.000Z",
    trackCount: 2,
    uploadedImageURL: "/web-app-manifest-192x192.png",
    tracks: [TRACKS[2], TRACKS[5]],
  },
  {
    id: "offline-library-album-2",
    name: "Soft Static",
    slug: "soft-static",
    author: "NoMusic",
    description: "Minimal vocal cuts arranged like a calm late-evening release.",
    type: "album",
    updatedAt: "2026-06-26T12:00:00.000Z",
    trackCount: 2,
    uploadedImageURL: null,
    tracks: [TRACKS[0], TRACKS[3]],
  },
  {
    id: "offline-library-user-2",
    name: "Shared with Friends",
    slug: "shared-with-friends",
    author: "Hasan",
    description: "Tracks grouped the same way a private shared library would feel in the client.",
    type: "user",
    updatedAt: "2026-06-25T12:00:00.000Z",
    trackCount: 3,
    uploadedImageURL: "/pwa/icon.png",
    tracks: [TRACKS[1], TRACKS[4], TRACKS[5]],
  },
  {
    id: "offline-library-language-2",
    name: "English Nights",
    slug: "english-nights",
    author: "NoMusic",
    description: "An English language shelf with polished, brighter vocal arrangements.",
    type: "language",
    updatedAt: "2026-06-24T12:00:00.000Z",
    trackCount: 3,
    uploadedImageURL: null,
    tracks: [TRACKS[0], TRACKS[3], TRACKS[4]],
  },
] as const;

export function getOfflineLibrariesByType(type: TLibrary["type"]) {
  return OFFLINE_LIBRARY_UI_ITEMS.filter((library) => library.type === type);
}

export function getOfflineLibraryUiById(id: string) {
  return OFFLINE_LIBRARY_UI_ITEMS.find((library) => library.id === id) ?? OFFLINE_LIBRARY_UI_ITEMS[0];
}
