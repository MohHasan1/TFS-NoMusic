"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { QUERY_KEYS, TNomusicFilters } from "./keys";
import { TNoMusicPaginated } from "#types/nomusic";
import { fetchNomusicInfiniteFn } from "./service";

export function useNomusicPageInfiniteQuery(
  initialData: TNoMusicPaginated,
  filters: TNomusicFilters = {},
) {
  const hasFilters = hasNomusicFilters(filters);

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.nomusic.infinite(filters),
    queryFn: fetchNomusicInfiniteFn,
    initialPageParam: NOMUSIC_PAGINATION.PAGE as number,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    initialData: hasFilters
      ? undefined
      : {
          pages: [initialData],
          pageParams: [NOMUSIC_PAGINATION.PAGE],
        },
    getNextPageParam: (prevRes) => {
      return prevRes.hasNextPage ? prevRes.nextPage : undefined;
    },
  });
}

function hasNomusicFilters(filters: TNomusicFilters) {
  return Object.values(filters).some(Boolean);
}
