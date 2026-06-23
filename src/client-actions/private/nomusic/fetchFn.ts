import type { QueryFunctionContext } from "@tanstack/react-query";
import type { PaginatedDocs } from "payload";
import { stringify } from "qs-esm";

import { NOMUSIC_DEFAULT_SELECT } from "#collection-default-select/nomusic";
import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { mapNomusic } from "#services/nomusic/no-music.mapper";
import type { TNoMusicPaginated } from "#types/nomusic";
import type { Nomusic } from "#payload-types";
import { buildNomusicWhere } from "./utils";
import { QUERY_KEYS } from "./keys";

export async function fetchNomusicInfiniteFn({
  pageParam,
  queryKey,
}: QueryFunctionContext<TNomusicInfiniteQueryKey, number>) {
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
      select: NOMUSIC_DEFAULT_SELECT,
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

type TNomusicInfiniteQueryKey = ReturnType<typeof QUERY_KEYS.nomusic.infinite>;
