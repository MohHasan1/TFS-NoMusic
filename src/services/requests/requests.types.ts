import type { User } from "#payload-types";

export type TNoMusicRequest = {
  user: Pick<User, "name" | "email">;
  youtubeURL: string;
};
