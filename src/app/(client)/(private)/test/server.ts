"use server";

import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { listNomusicPaginated } from "#services/no-music/no-music.ports";

export async function loadMoreNomusicAction(
  page: number,
  limit: number = NOMUSIC_PAGINATION.LIMIT,
) {
  return listNomusicPaginated({
    page,
    limit: limit,
  });
}
