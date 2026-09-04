const PLAYLISTS_KEY = "playlists";

export const QUERY_KEYS = {
  playlists: {
    list: [PLAYLISTS_KEY, "list"] as const,
    membership: (trackId: string) => [PLAYLISTS_KEY, "membership", trackId] as const,
  },
  playlist: {
    one: (id: string) => [PLAYLISTS_KEY, "one", id] as const,
  },
} as const;
