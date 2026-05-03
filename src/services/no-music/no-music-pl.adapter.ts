import { getPayloadClient } from "@/lib/payload-client";
import type { BrowsableNoMusicDTO } from "@/services/no-music/dto";
import { serializeBrowsableNoMusic } from "@/services/no-music/no-music.serializer";
import type { Nomusic } from "../../payload-types";

export async function listBrowsableNoMusic(): Promise<BrowsableNoMusicDTO[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "nomusic",
    depth: 1,
    limit: 100,
    sort: "-createdAt",
    pagination: false,
  });

  return serializeBrowsableNoMusic(result.docs as Nomusic[]);
}
