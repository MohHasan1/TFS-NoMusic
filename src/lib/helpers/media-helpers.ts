import type { Media, Nomusic } from "#payload-types";

export function getCoverImageURL(imageFile: Nomusic["imageFile"]): string | null | undefined {
  if (!imageFile) return undefined;

  // -- External audio URL from audio file (upload)
  if (isMediaImage(imageFile)) {
    return imageFile.url ?? undefined;
  }

  return undefined;
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
