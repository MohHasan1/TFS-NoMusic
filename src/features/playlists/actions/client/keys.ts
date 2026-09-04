const PLAYLISTS_KEY = "playlists";

export const QUERY_KEYS = {
  playlists: {
    list: [PLAYLISTS_KEY, "list"] as const,
  },
  playlist: {
    one: (id: string) => [PLAYLISTS_KEY, "one", id] as const,
  },
} as const;
