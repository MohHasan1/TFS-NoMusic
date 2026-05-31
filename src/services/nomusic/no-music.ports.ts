import {
  listNomusicAdapter,
  listNomusicPaginatedAdapter,
  TListNomusicArg,
} from "./no-music-pl.adapter";

export async function listNomusic(limit: number = 70) {
  return listNomusicAdapter(limit);
}

export async function listNomusicPaginated(arg: TListNomusicArg) {
  return listNomusicPaginatedAdapter(arg);
}
