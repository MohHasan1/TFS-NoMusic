import { Nomusic } from "@/payload-types";
import { type CollectionBeforeValidateHook } from "payload";

export const syncStreamURLFromAudioFile: CollectionBeforeValidateHook<Nomusic> = async ({ data, req }) => {
  if (!data) return data;

  const audioFile = data.audioFile;
  if (!audioFile) return data;

  // -- If the relation is populated, read the media URL directly.
  if (typeof audioFile === "object" && audioFile !== null && "url" in audioFile) {
    const mediaURL = typeof audioFile.url === "string" ? audioFile.url : undefined;
    if (!mediaURL) return data;

    return {
      ...data,
      streamURL: mediaURL,
    };
  }

  // -- If the relation is an ID, fetch media first, then copy its URL.
  if (typeof audioFile === "number" || typeof audioFile === "string") {
    const media = await req.payload.findByID({
      collection: "media",
      id: audioFile,
    });

    if (typeof media?.url !== "string") return data;

    return {
      ...data,
      streamURL: media.url,
    };
  }

  return data;
};
