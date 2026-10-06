import type { Nomusic } from "#payload-types";

export type TAudioShare = Pick<Nomusic, "id" | "name" | "artist" | "duration" | "language"> & {
  coverImage?: string | null;
};
