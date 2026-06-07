import { errorResponse, successResponse } from "#responses";
import { tryCatchResponse } from "#trycatch-response";
import { getPayloadClient } from "#payload-client";
import { mapNomusic } from "./no-music.mapper";
import { Nomusic } from "#payload-types";
import { TNoMusicPaginated } from "#types/nomusic";

export async function listNomusicAdapter(limit: number) {
  const payload = await getPayloadClient();

  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "nomusic",
      depth: 0,
      limit: limit,
      sort: "-updatedAt",
      pagination: false,
      select: {
        name: true,
        title: true,
        artist: true,
        language: true,
        duration: true,
        updatedAt: true,
        uploadedImageURL: true,
        uploadedAudioURL: true,
      },
    }),
  );

  if (!res.isSuccess) return errorResponse(res.errors, res.message);

  const mapped = mapNomusic(res.data.docs as Nomusic[]);
  return successResponse(mapped);
}

export async function listNomusicPaginatedAdapter({ page = 1, limit = 50 }: TListNomusicArg = {}) {
  const payload = await getPayloadClient();

  const res = await tryCatchResponse(() =>
    payload.find({
      collection: "nomusic",
      depth: 0,
      page,
      limit,
      sort: "-createdAt",
      pagination: true,
      select: {
        name: true,
        title: true,
        artist: true,
        language: true,
        duration: true,
        updatedAt: true,
        uploadedImageURL: true,
        uploadedAudioURL: true,
      },
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
