import { findPublicAudioShareByIdAdapter } from "./audio-sharing-pl.adapter";

export async function findPublicAudioShareById(id: string) {
  return findPublicAudioShareByIdAdapter(id);
}
