import { z } from "zod";

import { REQUEST_NOMUSIC_CLIENT } from "#constants/private/request-nomusic";

export const RequestNoMusicSchema = z.object({
  youtubeURL: z
    .url(REQUEST_NOMUSIC_CLIENT.VALIDATION_URL_ERROR)
    .min(1, REQUEST_NOMUSIC_CLIENT.VALIDATION_URL_REQUIRED)
    .refine(isYouTubeURL, REQUEST_NOMUSIC_CLIENT.VALIDATION_URL_ERROR),
});

export type TRequestNoMusicSchema = z.infer<typeof RequestNoMusicSchema>;

function isYouTubeURL(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    return (
      host === "youtube.com" ||
      host === "www.youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtu.be" ||
      host === "www.youtu.be"
    );
  } catch {
    return false;
  }
}
