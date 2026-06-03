import type { QueryFunctionContext } from "@tanstack/react-query";
import type { PaginatedDocs } from "payload";
import { stringify } from "qs-esm";

import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { mapNomusic } from "#services/nomusic/no-music.mapper";
import type { TNoMusicPaginated } from "#types/nomusic";
import type { Nomusic } from "#payload-types";
import { QUERY_KEYS } from "./keys";

type TNomusicInfiniteQueryKey = ReturnType<typeof QUERY_KEYS.nomusic.infinite>;

export async function fetchNomusicInfiniteFn({
  pageParam,
}: QueryFunctionContext<TNomusicInfiniteQueryKey, number>) {
  const query = stringify(
    {
      depth: 0,
      page: pageParam,
      limit: NOMUSIC_PAGINATION.LIMIT,
      sort: "-createdAt",
      pagination: true,
      select: {
        name: true,
        artist: true,
        language: true,
        duration: true,
        createdAt: true,
        coverImage: true,
        uploadedAudioURL: true,
      },
    },
    { addQueryPrefix: true },
  );

  const response = await fetch(`/api/nomusic${query}`);

  if (!response.ok) {
    throw new Error("Failed to load NoMusic.");
  }

  const result = (await response.json()) as PaginatedDocs<Nomusic>;

  return {
    ...result,
    docs: mapNomusic(result.docs),
  } as TNoMusicPaginated;
}
