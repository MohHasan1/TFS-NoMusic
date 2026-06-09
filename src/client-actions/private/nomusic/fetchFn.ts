import type { QueryFunctionContext } from "@tanstack/react-query";
import type { PaginatedDocs } from "payload";
import { stringify } from "qs-esm";

import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { mapNomusic } from "#services/nomusic/no-music.mapper";
import type { TNoMusicPaginated } from "#types/nomusic";
import type { Nomusic } from "#payload-types";
import { buildNomusicWhere } from "./utils";
import { QUERY_KEYS } from "./keys";
import { logInfo } from "#loggers";

type TNomusicInfiniteQueryKey = ReturnType<typeof QUERY_KEYS.nomusic.infinite>;

export async function fetchNomusicInfiniteFn({
  pageParam,
  queryKey,
}: QueryFunctionContext<TNomusicInfiniteQueryKey, number>) {
  logInfo("fetchNomusicInfiniteFn")
  const [, , filters] = queryKey;
  const where = buildNomusicWhere(filters);

  const query = stringify(
    {
      depth: 0,
      page: pageParam,
      limit: NOMUSIC_PAGINATION.LIMIT,
      sort: "-updatedAt",
      pagination: true,
      ...(where ? { where } : {}),
      select: {
        name: true,
        artist: true,
        language: true,
        duration: true,
        updatedAt: true,
        uploadedImageURL: true,
        uploadedAudioURL: true,
      },
    },
    { addQueryPrefix: true },
  );

  const response = await fetch(`/api/nomusic${query}`);

  logInfo("response", response)

  if (!response.ok) {
    throw new Error("Failed to load NoMusic.");
  }

  const result = (await response.json()) as PaginatedDocs<Nomusic>;

  logInfo("result", result)


  return {
    ...result,
    docs: mapNomusic(result.docs),
  } as TNoMusicPaginated;
}
