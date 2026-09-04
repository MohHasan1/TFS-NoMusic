// Caps that keep DB size and fetches bounded.
export const PLAYLIST_LIMITS = {
  perUser: 10,
  tracks: 100,
} as const;

// Form field length constraints.
export const PLAYLIST_FIELD_LIMITS = {
  nameMin: 1,
  nameMax: 35,
  descriptionMax: 100,
} as const;
