import type { LibrariesSelect } from "#payload-types";

export const LIBRARIES_DEFAULT_SELECT = {
  name: true,
  slug: true,
  type: true,
  author: true,
  updatedAt: true,
  trackCount: true,
  description: true,
  uploadedImageURL: true,
} satisfies LibrariesSelect<true>;
