import type { Nomusic } from "#payload-types";

export type TNoMusic = {
  id: Nomusic["id"];
  title: Nomusic["title"];
  artist: Nomusic["artist"];
  language: Nomusic["language"];
  uploadedAt: Nomusic["updatedAt"];
  duration: Nomusic["duration"];
  coverImage: string | null | undefined; // Type media - just intrested in the url 
  audioStreamUrl: string;  // Type media - just intrested in the url 
};
