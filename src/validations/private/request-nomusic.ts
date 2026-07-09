import { z } from "zod";
import { REQUEST_NOMUSIC_CLIENT } from "#constants/private/request-nomusic";
import Fields from "../shared";

export const RequestNoMusicSchema = z.object({
  url: Fields.url({
    invalid: REQUEST_NOMUSIC_CLIENT.VALIDATION_URL_ERROR,
  }).refine(isSupportedMusicURL, REQUEST_NOMUSIC_CLIENT.VALIDATION_URL_ERROR),
});

export type TRequestNoMusicSchema = z.infer<typeof RequestNoMusicSchema>;

function isSupportedMusicURL(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();

    return (
      host === "youtube.com" ||
      host.endsWith(".youtube.com") ||
      host === "youtu.be" ||
      host === "www.youtu.be" ||
      host === "spotify.com" ||
      host.endsWith(".spotify.com")
    );
  } catch {
    return false;
  }
}
