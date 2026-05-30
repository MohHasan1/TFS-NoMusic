"use server";

import { listNomusicPaginated } from "#services/no-music/no-music.ports";

export async function loadMoreNomusicAction(page: number, limit:number) {
  return listNomusicPaginated({
    page,
    limit: limit,
  });
}
