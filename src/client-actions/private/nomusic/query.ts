"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { QUERY_KEYS, TNomusicFilters } from "./keys";
import { TNoMusicPaginated } from "#types/nomusic";
import { fetchNomusicInfiniteFn } from "./fetchFn";

export function useNomusicPageInfiniteQuery(
  initialData: TNoMusicPaginated,
  filters: TNomusicFilters = {},
) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.nomusic.infinite(filters),
    queryFn: fetchNomusicInfiniteFn,
    initialPageParam: NOMUSIC_PAGINATION.PAGE,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    initialData: {
      pages: [initialData],
      pageParams: [NOMUSIC_PAGINATION.PAGE],
    },
    getNextPageParam: (prevRes) => (prevRes?.hasNextPage ? prevRes.nextPage : undefined),
  });
}
