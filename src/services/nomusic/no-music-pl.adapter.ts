import type { Where } from "payload";
import { NOMUSIC_DEFAULT_SELECT } from "#collection-default-select/nomusic";
import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { getPayloadClient } from "#payload-client";
import type { Nomusic } from "#payload-types";
import { errorResponse, successResponse } from "#responses";
import { tryCatchResponse } from "#trycatch-response";
import type { TNoMusicPaginated } from "#types/nomusic";
import type { TNoMusicShare } from "#types/nomusic-share";
import { mapNomusic } from "./no-music.mapper";

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

export async function findPublicAudioShareByIdAdapter(id: string) {
  const payload = await getPayloadClient();

  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "nomusic",
      depth: 0,
      limit: 1,
      pagination: false,
      overrideAccess: true,
      where: {
        and: [{ id: { equals: id } }, { visibility: { equals: "public" } }],
      },
      select: {
        name: true,
        artist: true,
        duration: true,
        language: true,
        externalImageURL: true,
        uploadedImageURL: true,
      },
    }),
  );

  if (!res.isSuccess) return errorResponse(res.errors, res.message);

  const [track] = res.data.docs;

  if (!track) return successResponse<TNoMusicShare | null>(null);

  return successResponse<TNoMusicShare>({
    id: track.id,
    name: track.name,
    artist: track.artist,
    duration: track.duration,
    language: track.language,
    coverImage: track.uploadedImageURL || track.externalImageURL,
  });
}

export async function listNomusicPaginatedAdapter({ page = 1, limit = 50, language }: TListNomusicArg = {}) {
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
