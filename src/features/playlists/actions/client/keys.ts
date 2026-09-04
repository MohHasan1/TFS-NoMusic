const PLAYLISTS_KEY = "playlists";

export const QUERY_KEYS = {
  playlists: {
    list: [PLAYLISTS_KEY, "list"] as const,
  },
  playlist: {},
} as const;
