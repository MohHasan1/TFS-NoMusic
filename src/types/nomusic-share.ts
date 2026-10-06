import type { Nomusic } from "#payload-types";

export type TNoMusicShare = Pick<Nomusic, "id" | "name" | "artist" | "duration" | "language"> & {
  coverImage?: string | null;
};
