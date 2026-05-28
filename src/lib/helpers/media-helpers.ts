import type { Media, Nomusic } from "#payload-types";

export function getCoverImageURL(coverImage: Nomusic["coverImage"]): string | null | undefined {
  if (!coverImage) return undefined;

  const src = coverImage?.source;

  // -- External Image URL (eg. unplash or other cdn)
  let externalImageURL: string | null | undefined;
  if (coverImage.externalImageURL) {
    externalImageURL = coverImage.externalImageURL;
  }

  // -- Uploaded Image URL (Extracted from Uploded Media - R2, or S3)
  let uploadedImageURL: string | null | undefined;
  if (coverImage.uploadedImageURL) {
    uploadedImageURL = coverImage.uploadedImageURL;
  }

  // -- External Image URL from image file (Uploded Media)
  if (!uploadedImageURL && isMediaImage(coverImage.imageFile)) {
    uploadedImageURL = coverImage.imageFile.url ?? undefined;
  }

  const imageUrl = src === "external_url" ? externalImageURL : uploadedImageURL;

  return imageUrl;
}

export function getAudioURL(audioFile: Nomusic["audioFile"]) {
  if (!audioFile) return undefined;

  // -- External audio URL from audio file (upload)
  if (isMediaAudio(audioFile)) {
    return audioFile.url ?? undefined;
  }

  return undefined;
}

// --- Media Helper --- //
export function isMedia(obj: unknown): obj is Media {
  return obj !== null && typeof obj === "object" && "id" in obj && "url" in obj;
}

export function isMediaImage(obj: unknown): obj is Media {
  return isMedia(obj) && obj.type === "image";
}

export function isMediaAudio(obj: unknown): obj is Media {
  return isMedia(obj) && obj.type === "audio";
}
