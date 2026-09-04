"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchMyPlaylistsFn } from "./fetchFn";
import { QUERY_KEYS } from "./keys";

export function useMyPlaylistsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.playlists.list,
    queryFn: fetchMyPlaylistsFn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });
}
