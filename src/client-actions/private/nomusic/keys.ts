const NOMUSIC_KEY = "nomusic";

export const QUERY_KEYS = {
  nomusic: {
    all: [NOMUSIC_KEY] as const,
    infinite: () => [NOMUSIC_KEY, "infinite"] as const,
    detail: (songId: string) => [NOMUSIC_KEY, "detail", songId] as const,
  },
} as const;
