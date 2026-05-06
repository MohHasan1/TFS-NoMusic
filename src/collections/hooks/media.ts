import type { CollectionBeforeValidateHook } from "payload";
import { MEDIA_FOLDER_PREFIX } from "../helpers/media";
import { Media } from "@/payload-types";

export const setMediaPrefixBeforeValidate: CollectionBeforeValidateHook<Media> = ({ data }) => {
  if (!data) return data;

  const folder = typeof data.folder === "string" ? data.folder : null;

  const prefixFromFolder = folder ? MEDIA_FOLDER_PREFIX[folder] : undefined;
  if (prefixFromFolder) {
    return {
      ...data,
      prefix: prefixFromFolder,
    };
  }

  return data;
};

export const detectMediaTypeBeforeValidate: CollectionBeforeValidateHook<Media> = ({ data }) => {
  if (!data) return data;

  const mimeType = typeof data.mimeType === "string" ? data.mimeType.toLowerCase() : "";
  if (!mimeType) return data;

  const detectedType = mimeType.startsWith("audio/") ? "audio" : mimeType.startsWith("image/") ? "image" : "other";

  if (data.type === detectedType) return data;

  return {
    ...data,
    type: detectedType,
  };
};
