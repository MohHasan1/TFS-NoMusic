"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { TNoMusicPaginated } from "#types/nomusic";
import { fetchNomusicInfiniteFn } from "./service";
import { QUERY_KEYS } from "./keys";

export function useNomusicPageInfiniteQuery(initialData: TNoMusicPaginated) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.nomusic.infinite(),
    queryFn: fetchNomusicInfiniteFn,
    initialPageParam: NOMUSIC_PAGINATION.PAGE as number,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    initialData: {
      pages: [initialData],
      pageParams: [NOMUSIC_PAGINATION.PAGE],
    },
    getNextPageParam: (presRes) => {
      return presRes.hasNextPage ? presRes.nextPage : undefined;
    },
  });
}
