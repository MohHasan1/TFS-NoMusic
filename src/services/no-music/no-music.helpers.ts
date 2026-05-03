import type { Media, Nomusic } from "@/payload-types";

export function getCoverURL(coverImage: Nomusic["coverImage"]) {
  if (!coverImage) return undefined;

  if (coverImage.url) {
    return coverImage.url;
  }

  if (isMedia(coverImage.upload) && coverImage.upload.type === "image") {
    return coverImage.upload.url ?? undefined;
  }

  return undefined;
}

export function isMedia(value: unknown): value is Media {
  return typeof value === "object" && value !== null && "id" in value;
}
