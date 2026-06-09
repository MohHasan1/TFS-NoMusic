"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { QUERY_KEYS, TNomusicFilters } from "./keys";
import { TNoMusicPaginated } from "#types/nomusic";
import { fetchNomusicInfiniteFn } from "./fetchFn";
import { isNomusicFilters } from "./utils";

export function useNomusicPageInfiniteQuery(
  initialData: TNoMusicPaginated,
  filters: TNomusicFilters = {},
) {
  const hasFilters = isNomusicFilters(filters);

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.nomusic.infinite(filters),
    queryFn: fetchNomusicInfiniteFn,
    initialPageParam: NOMUSIC_PAGINATION.PAGE,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60,
    initialData: hasFilters
      ? undefined
      : {
          pages: [initialData],
          pageParams: [NOMUSIC_PAGINATION.PAGE],
        },
    getNextPageParam: (prevRes) => (prevRes?.hasNextPage ? prevRes.nextPage : undefined),
  });
}
