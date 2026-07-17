import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { NOMUSIC_DEFAULT_SELECT } from "#collection-default-select/nomusic";
import { errorResponse, successResponse } from "#responses";
import { tryCatchResponse } from "#trycatch-response";
import { TNoMusicPaginated } from "#types/nomusic";
import { getPayloadClient } from "#payload-client";
import { mapNomusic } from "./no-music.mapper";
import { Nomusic } from "#payload-types";
import type { Where } from "payload";

export async function listNomusicAdapter(limit: number) {
  const payload = await getPayloadClient();
  // -- Authentication - for now I am not adding it, proxy is teh only place auth check is done, once ur in there is no need to check for now.
  // const userRes = await tryCatchResponse(async () =>
  //   payload.auth({
  //     headers: await nextHeaders(),
  //   }),
  // );
  // if (!userRes.isSuccess || !userRes.data.user) redirect(PUBLIC_ROUTES.LOGOUT);

  // -- Authorization -> Fetch no-music
  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "nomusic",
      depth: 0,
      limit: limit,
      sort: "-updatedAt",
      // overrideAccess: false,
      // user: userRes.data.user,
      pagination: false,
      select: NOMUSIC_DEFAULT_SELECT,
    }),
  );

  if (!res.isSuccess) return errorResponse(res.errors, res.message);

  const mapped = mapNomusic(res.data.docs as Nomusic[]);
  return successResponse(mapped);
}

export async function listNomusicPaginatedAdapter({
  page = 1,
  limit = 50,
  language,
}: TListNomusicArg = {}) {
  const payload = await getPayloadClient();

  // -- Authentication
  // const userRes = await tryCatchResponse(async () =>
  //   payload.auth({
  //     headers: await nextHeaders(),
  //   }),
  // );
  // if (!userRes.isSuccess || !userRes.data.user) redirect(PUBLIC_ROUTES.LOGOUT);

  const where: Where | undefined = language ? { language: { equals: language } } : undefined;

  // -- Authorization -> Fetch no-music
  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "nomusic",
      depth: 0,
      page,
      limit,
      sort: "-updatedAt",
      pagination: true,
      // user: userRes.data.user,
      // overrideAccess: false,
      where,
      select: NOMUSIC_DEFAULT_SELECT,
    }),
  );

  if (!res.isSuccess) return errorResponse(res.errors, res.message);

  const mapped = mapNomusic(res.data.docs as Nomusic[]);
  return successResponse({
    ...res.data,
    docs: mapped,
  } as TNoMusicPaginated);
}

export type TListNomusicArg = {
  page?: number;
  limit?: number;
  language?: TLANGUAGES_VALUES;
};
