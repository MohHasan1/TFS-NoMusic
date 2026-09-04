export const PLAYLIST_VISIBILITY = ["private", "public", "unlisted"] as const;
export type TPLAYLIST_VISIBILITY = (typeof PLAYLIST_VISIBILITY)[number];

export const PLAYLIST_VISIBILITY_OPTIONS = [
  { label: "Private", value: "private" },
  { label: "Public", value: "public" },
  { label: "Unlisted", value: "unlisted" },
] as const;
