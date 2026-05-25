import { REQUEST_NOMUSIC_CLIENT } from "#constants/private/request-nomusic";
import Fields from "../shared";
import { z } from "zod";

export const RequestNoMusicSchema = z.object({
  url: Fields.url({
    invalid: REQUEST_NOMUSIC_CLIENT.VALIDATION_URL_ERROR,
  }).refine(isYouTubeURL, REQUEST_NOMUSIC_CLIENT.VALIDATION_URL_ERROR),
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
