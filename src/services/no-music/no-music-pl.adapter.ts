import { getPayloadClient } from "@/lib/payload/client";
import type { Nomusic } from "@/payload-types";
import type { TNoMusic } from "@/types/nomusic";
import { mapNomusic } from "./no-music.mapper";

export async function listNomusicAdapter(): Promise<TNoMusic[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "nomusic",
    depth: 0,
    limit: 100,
    sort: "-createdAt",
    pagination: false,
    select: {
      title: true,
      artist: true,
      language: true,
      duration: true,
      updatedAt: true,
      coverImage: true,
      uploadedAudioURL: true,
    },
  });

  return mapNomusic(result.docs as unknown as Nomusic[]);
}
