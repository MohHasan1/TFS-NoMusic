import type { Media, Nomusic } from "@/payload-types";

export function getCoverImageURL(coverImage: Nomusic["coverImage"]): string | null | undefined {
  if (!coverImage) return undefined;

  const src = coverImage?.source;

  // -- External Image URL (eg. unplash)
  let externalImageURL: string | null | undefined;
  if (coverImage.externalImageURL) {
    externalImageURL = coverImage.externalImageURL;
  }

  // -- Uploaded Image URL (Extracted from Uploded Media)
  let uploadedImageURL: string | null | undefined;
  if (coverImage.uploadedImageURL) {
    uploadedImageURL = coverImage.uploadedImageURL;
  }

  // -- External Image URL from image file (Uploded Media)
  if (!uploadedImageURL && isMedia(coverImage.imageFile) && coverImage.imageFile.type === "image") {
    uploadedImageURL = coverImage.imageFile.url ?? undefined;
  }

  const imageUrl = src === "external_url" ? externalImageURL : uploadedImageURL;

  return imageUrl;
}

export function getAudioURL(audioFile: Nomusic["audioFile"]) {
  if (!audioFile) return undefined;

  // -- External audio URL from audio file (upload)
  if (isMedia(audioFile) && audioFile.type === "audio") {
    return audioFile.url ?? undefined;
  }

  return undefined;
}

export function isMedia(value: unknown): value is Media {
  return typeof value === "object" && value !== null && "id" in value;
}
