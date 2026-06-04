const NOMUSIC_KEY = "nomusic";

export const QUERY_KEYS = {
  nomusic: {
    list: [NOMUSIC_KEY] as const,
    infinite: (filters: TNomusicFilters = {}) => [NOMUSIC_KEY, "infinite", filters] as const,
    one: (songId: string) => [NOMUSIC_KEY, "detail", songId] as const,
  },
} as const;

// NOTE: to add filter-by add here:["language", "artist"]: Must match the field:
export const NOMUSIC_FILTER_FIELDS = ["language"] as const;
export type TNomusicFilterField = (typeof NOMUSIC_FILTER_FIELDS)[number];
export type TNomusicFilters = Partial<Record<TNomusicFilterField, string | null>>;
