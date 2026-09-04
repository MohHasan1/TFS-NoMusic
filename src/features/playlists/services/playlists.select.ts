import type { PlaylistsSelect } from "#payload-types";

export const PLAYLIST_LIST_SELECT = {
  name: true,
  author: true,
  description: true,
  visibility: true,
  trackCount: true,
  updatedAt: true,
  uploadedImageURL: true,
  imageFile: true,
} satisfies PlaylistsSelect<true>;

export const PLAYLIST_DETAIL_SELECT = {
  ...PLAYLIST_LIST_SELECT,
  tracks: true,
} satisfies PlaylistsSelect<true>;
