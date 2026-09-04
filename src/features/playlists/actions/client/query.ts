"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchMyPlaylistsFn, fetchPlaylistFn } from "./fetchFn";
import { QUERY_KEYS } from "./keys";

export function useMyPlaylistsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.playlists.list,
    queryFn: fetchMyPlaylistsFn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
  });
}

export function usePlaylistQuery(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.playlist.one(id),
    queryFn: () => fetchPlaylistFn(id),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    retry: false,
  });
}
