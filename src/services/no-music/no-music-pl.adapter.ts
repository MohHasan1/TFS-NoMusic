import { getPayloadClient } from "@/lib/payload-client";
import { mapNomusic } from "./no-music.mapper";
import { TNoMusic } from "@/types/nomusic";
import { Nomusic } from "@/payload-types";

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
      updatedAt: true,
      coverImage: true,
      uploadedAudioURL: true,
    },
  });

  console.log(result);

  return mapNomusic(result.docs as unknown as Nomusic[]);
}
