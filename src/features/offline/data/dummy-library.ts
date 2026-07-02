import type { TLibrary } from "#types/library";

import { dummyLibraryNomusic } from "./dummy-nomusic";

const LIBRARY_BLUEPRINTS: Array<Pick<TLibrary, "name" | "slug" | "author" | "type" | "description">> =
  [
    {
      name: "Offline Hindi Picks",
      slug: "offline-hindi-picks",
      author: "NoMusic",
      type: "language",
      description: "Downloaded Hindi vocals for offline listening.",
    },
    {
      name: "Offline Heartfelt Voices",
      slug: "offline-heartfelt-voices",
      author: "NoMusic",
      type: "album",
      description: "Warm unplugged vocals saved for quiet listening.",
    },
    {
      name: "Offline Shared Favourites",
      slug: "offline-shared-favourites",
      author: "NoMusic",
      type: "user",
      description: "Community favourites ready on this device.",
    },
    {
      name: "Offline Evening Melodies",
      slug: "offline-evening-melodies",
      author: "NoMusic",
      type: "album",
      description: "Soft evening tracks cached for offline playback.",
    },
    {
      name: "Offline Creator Collection",
      slug: "offline-creator-collection",
      author: "NoMusic",
      type: "user",
      description: "Downloaded creator picks you can open anywhere.",
    },
    {
      name: "Offline Hindi Collection",
      slug: "offline-hindi-collection",
      author: "NoMusic",
      type: "language",
      description: "Hindi NoMusic saved for travel and low signal.",
    },
    {
      name: "Offline Late Night Session",
      slug: "offline-late-night-session",
      author: "NoMusic",
      type: "album",
      description: "Late-night vocals stored locally for quick access.",
    },
    {
      name: "Offline Shared Gems",
      slug: "offline-shared-gems",
      author: "NoMusic",
      type: "user",
      description: "Shared libraries downloaded straight to this device.",
    },
    {
      name: "Offline Vocal Mornings",
      slug: "offline-vocal-mornings",
      author: "NoMusic",
      type: "album",
      description: "A calm morning set of vocals available offline.",
    },
    {
      name: "Offline Desi Voices",
      slug: "offline-desi-voices",
      author: "NoMusic",
      type: "language",
      description: "Regional vocal collections cached for easy listening.",
    },
    {
      name: "Offline Private Shelf",
      slug: "offline-private-shelf",
      author: "NoMusic",
      type: "user",
      description: "A private-style shelf of saved offline collections.",
    },
    {
      name: "Offline Repeat Queue",
      slug: "offline-repeat-queue",
      author: "NoMusic",
      type: "album",
      description: "Replay-worthy tracks bundled into an offline set.",
    },
  ];

export const dummyLibraries: TLibrary[] = LIBRARY_BLUEPRINTS.map((library, index) => ({
  id: `offline-dummy-library-${index + 1}`,
  ...library,
  updatedAt: `2026-06-${String(index + 18).padStart(2, "0")}T03:00:00.000Z`,
  trackCount: dummyLibraryNomusic.length,
  uploadedImageURL: dummyLibraryNomusic[index % dummyLibraryNomusic.length]?.coverImage ?? null,
}));

export const dummyLibrary = dummyLibraries[0]!;
