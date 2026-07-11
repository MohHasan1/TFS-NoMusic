import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
// import { cacheLife, cacheTag } from "next/cache";
import {
  listNomusicAdapter,
  listNomusicPaginatedAdapter,
  TListNomusicArg,
} from "./no-music-pl.adapter";

export async function listNomusic(limit: number = NOMUSIC_PAGINATION.LIMIT) {
  // "use cache";
  // cacheLife("days");
  // cacheTag("audio");

  return listNomusicAdapter(limit);
}

export async function listNomusicPaginated(arg: TListNomusicArg) {
  // "use cache";
  // cacheLife("days");
  // cacheTag(`audio-${arg.limit}-${arg.page}`);

  return listNomusicPaginatedAdapter(arg);
}
