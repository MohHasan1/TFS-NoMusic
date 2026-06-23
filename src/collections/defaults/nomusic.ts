import type { NomusicSelect } from "#payload-types";

export const NOMUSIC_DEFAULT_SELECT = {
  name: true,
  artist: true,
  duration: true,
  language: true,
  updatedAt: true,
  uploadedAudioURL: true,
  uploadedImageURL: true,
} satisfies NomusicSelect<true>;