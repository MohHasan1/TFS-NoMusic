import type { CollectionBeforeValidateHook } from "payload";
import { Media } from "@/payload-types";

export const addMediaTypeBeforeValidate: CollectionBeforeValidateHook<Media> = ({ data }) => {
  if (!data) return data;

  const mimeType = typeof data.mimeType === "string" ? data.mimeType.toLowerCase() : "";
  if (!mimeType) return data;

  const detectedType = mimeType.startsWith("audio/")
    ? "audio"
    : mimeType.startsWith("image/")
      ? "image"
      : "other";
  if (data.type === detectedType) return data;

  return {
    ...data,
    type: detectedType,
  };
};
