// Caps that keep DB size and fetches bounded.
export const PLAYLIST_LIMITS = {
  perUser: 10,
  tracks: 100,
} as const;

const PLAYLIST_COVER_CDN = "https://cdn.thefamilysuite.org/nomusic/images/playlists";

// Randomly assigned to a new playlist that has no cover of its own.
export const PLAYLIST_FALLBACK_COVERS = [
  `${PLAYLIST_COVER_CDN}/wet_glass.jpg`,
  `${PLAYLIST_COVER_CDN}/black_abstruct.jpg`,
  `${PLAYLIST_COVER_CDN}/blue_heart.jpg`,
  `${PLAYLIST_COVER_CDN}/greenish.jpg`,
  `${PLAYLIST_COVER_CDN}/snowy_highway.jpg`,
  `${PLAYLIST_COVER_CDN}/smoke.jpg`,
  `${PLAYLIST_COVER_CDN}/roses.jpg`,
  `${PLAYLIST_COVER_CDN}/rose_ice.jpg`,
  `${PLAYLIST_COVER_CDN}/red_abstruct.jpg`,
  `${PLAYLIST_COVER_CDN}/purple_rose.jpg`,
  `${PLAYLIST_COVER_CDN}/orange_curve.jpg`,
  `${PLAYLIST_COVER_CDN}/orange_black_paper.jpg`,
  `${PLAYLIST_COVER_CDN}/ocean.jpg`,
  `${PLAYLIST_COVER_CDN}/ice.jpg`,
] as const;

export const PLAYLIST_VISIBILITY = ["private", "public", "unlisted"] as const;
export type TPLAYLIST_VISIBILITY = (typeof PLAYLIST_VISIBILITY)[number];

export const PLAYLIST_VISIBILITY_OPTIONS = [
  { label: "Private", value: "private" },
  { label: "Public", value: "public" },
  { label: "Unlisted", value: "unlisted" },
] as const;
