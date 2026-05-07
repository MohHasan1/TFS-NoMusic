import type { CollectionBeforeValidateHook } from "payload";
import { isID } from "@/lib/utils";
import type { Nomusic } from "@/payload-types";

export const syncUploadAudioURLBeforeValidate: CollectionBeforeValidateHook<Nomusic> = async ({ data, req }) => {
  if (!data?.audioFile) return data;
  const audioFile = data.audioFile;

  // -- If the relation is populated, read the media URL directly.
  if (typeof audioFile === "object" && audioFile !== null && "url" in audioFile) {
    const mediaURL = typeof audioFile.url === "string" ? audioFile.url : undefined;
    if (!mediaURL) return data;

    return {
      ...data,
      uploadedAudioURL: mediaURL,
    };
  }

  // -- If the relation is an ID, fetch media first, then copy its URL. (id can be num or string)
  if (isID(audioFile)) {
    const media = await req.payload.findByID({
      collection: "media",
      id: audioFile,
    });

    if (typeof media?.url !== "string") return data;

    return {
      ...data,
      uploadedAudioURL: media.url,
    };
  }

  return data;
};

export const syncUploadImageURLBeforeValidate: CollectionBeforeValidateHook<Nomusic> = async ({ data, req }) => {
  if (!data?.coverImage?.imageFile) return data;
  const imageFile = data.coverImage.imageFile;

  // -- If the relation is populated, read the media URL directly.
  if (typeof imageFile === "object" && imageFile !== null && "url" in imageFile) {
    const mediaURL = typeof imageFile.url === "string" ? imageFile.url : undefined;
    if (!mediaURL) return data;

    return {
      ...data,
      coverImage: {
        ...data.coverImage,
        uploadedImageURL: mediaURL,
      },
    };
  }

  // -- If the relation is an ID, fetch media first, then copy its URL.
  if (isID(imageFile)) {
    const media = await req.payload.findByID({
      collection: "media",
      id: imageFile,
    });

    if (typeof media?.url !== "string") return data;

    return {
      ...data,
      coverImage: {
        ...data.coverImage,
        uploadedImageURL: media.url,
      },
    };
  }

  return data;
};
