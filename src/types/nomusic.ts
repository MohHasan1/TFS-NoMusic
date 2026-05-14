import type { Nomusic } from "@/payload-types";

export type TNoMusic = {
  id: Nomusic["id"];
  title: Nomusic["title"];
  artist: Nomusic["artist"];
  language: Nomusic["language"];
  uploadedAt: Nomusic["updatedAt"];
  duration: number | null | undefined;
  coverImage: string | null | undefined;
  audioStreamUrl: string;
};
