import type { TNoMusic } from "#types/nomusic";

const DUMMY_AUDIO_URL = "/nomusic.svg";
const DUMMY_COVER_URL = "/web-app-manifest-512x512.png";
const DUMMY_SECONDARY_COVER_URL = "/web-app-manifest-192x192.png";

export const dummyNomusic: TNoMusic = {
  id: "offline-dummy-song",
  name: "Offline Test Song",
  artist: "NoMusic",
  language: "english",
  uploadedAt: "2026-06-29T00:00:00.000Z",
  duration: 126,
  coverImage: DUMMY_COVER_URL,
  audioStreamUrl: DUMMY_AUDIO_URL,
};

export const dummyLibraryNomusic: TNoMusic[] = [
  {
    id: "offline-dummy-library-song-1",
    name: "Offline Library Song One",
    artist: "NoMusic",
    language: "english",
    uploadedAt: "2026-06-29T01:00:00.000Z",
    duration: 164,
    coverImage: DUMMY_COVER_URL,
    audioStreamUrl: DUMMY_AUDIO_URL,
  },
  {
    id: "offline-dummy-library-song-2",
    name: "Offline Library Song Two",
    artist: "NoMusic",
    language: "bangla",
    uploadedAt: "2026-06-29T02:00:00.000Z",
    duration: 142,
    coverImage: DUMMY_SECONDARY_COVER_URL,
    audioStreamUrl: DUMMY_AUDIO_URL,
  },
] as const;
