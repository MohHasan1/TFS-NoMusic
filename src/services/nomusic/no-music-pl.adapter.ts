import { NOMUSIC_DEFAULT_SELECT } from "#collection-default-select/nomusic";
import { errorResponse, successResponse } from "#responses";
import { headers as nextHeaders } from "next/headers";
import { tryCatchResponse } from "#trycatch-response";
import { TNoMusicPaginated } from "#types/nomusic";
import { getPayloadClient } from "#payload-client";
import { PUBLIC_ROUTES } from "#constants/routes";
import { mapNomusic } from "./no-music.mapper";
import { Nomusic } from "#payload-types";
import { redirect } from "next/navigation";
import { logInfo } from "#loggers";

export async function listNomusicAdapter(limit: number) {
  const payload = await getPayloadClient();
  // -- Authentication
  const userRes = await tryCatchResponse(async () =>
    payload.auth({
      headers: await nextHeaders(),
    }),
  );
  if (!userRes.isSuccess || !userRes.data.user) redirect(PUBLIC_ROUTES.SIGNIN);

  // -- Authorization -> Fetch no-music
  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "nomusic",
      depth: 0,
      limit: limit,
      sort: "-updatedAt",
      overrideAccess: false,
      user: userRes.data.user,
      pagination: false,
      select: NOMUSIC_DEFAULT_SELECT,
    }),
  );

  if (!res.isSuccess) return errorResponse(res.errors, res.message);

  const mapped = mapNomusic(res.data.docs as Nomusic[]);
  return successResponse(mapped);
}

export async function listNomusicPaginatedAdapter({ page = 1, limit = 50 }: TListNomusicArg = {}) {
  const payload = await getPayloadClient();

  // -- Authentication
  const userRes = await tryCatchResponse(async () =>
    payload.auth({
      headers: await nextHeaders(),
    }),
  );
  if (!userRes.isSuccess || !userRes.data.user) redirect(PUBLIC_ROUTES.SIGNIN);

  // -- Authorization -> Fetch no-music
  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "nomusic",
      depth: 0,
      page,
      limit,
      sort: "-updatedAt",
      pagination: true,
      user: userRes.data.user,
      overrideAccess: false,
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
};
