import { PUBLIC_ROUTES } from "#constants/routes";
import type { TNoMusic } from "#types/nomusic";

export function getAudioShareUrl(audioId: TNoMusic["id"]) {
  return new URL(PUBLIC_ROUTES.SHARE_AUDIO(audioId), window.location.origin).toString();
}
