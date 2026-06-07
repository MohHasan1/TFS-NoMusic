import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import {
  listNomusicAdapter,
  listNomusicPaginatedAdapter,
  TListNomusicArg,
} from "./no-music-pl.adapter";

export async function listNomusic(limit: number = NOMUSIC_PAGINATION.LIMIT) {
  return listNomusicAdapter(limit);
}

export async function listNomusicPaginated(arg: TListNomusicArg) {
  return listNomusicPaginatedAdapter(arg);
}
