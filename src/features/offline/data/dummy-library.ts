import type { TLibrary } from "#types/library";

export const dummyLibrary: TLibrary = {
  id: "offline-dummy-library",
  name: "Offline Test Library",
  slug: "offline-test-library",
  author: "NoMusic",
  type: "user",
  updatedAt: "2026-06-29T03:00:00.000Z",
  trackCount: 2,
  description: "Temporary offline library used for IndexedDB and Cache Storage testing.",
  uploadedImageURL: "/pwa/icon.png",
};
