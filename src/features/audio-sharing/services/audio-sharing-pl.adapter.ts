import { getPayloadClient } from "#payload-client";
import { errorResponse, successResponse } from "#responses";
import { tryCatchResponse } from "#trycatch-response";
import type { TAudioShare } from "../types/audio-share";

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
        id: { equals: id },
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

  if (!track) return successResponse<TAudioShare | null>(null);

  return successResponse<TAudioShare>({
    id: track.id,
    name: track.name,
    artist: track.artist,
    duration: track.duration,
    language: track.language,
    coverImage: track.uploadedImageURL || track.externalImageURL,
  });
}
