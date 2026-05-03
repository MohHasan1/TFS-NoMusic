import type { Nomusic } from "@/payload-types";
import { getCoverURL, isMedia } from "@/services/no-music/no-music.helpers";
import type { BrowsableNoMusicDTO } from "@/services/no-music/dto";

export function serializeBrowsableNoMusic(docs: Nomusic[]): BrowsableNoMusicDTO[] {
  return docs.flatMap((doc) => {
    const noMusic = serializeBrowsableNoMusicItem(doc);
    return noMusic ? [noMusic] : [];
  });
}

function serializeBrowsableNoMusicItem(doc: Nomusic): BrowsableNoMusicDTO | null {
  if (!isMedia(doc.audioFile) || doc.audioFile.type !== "audio") {
    return null;
  }

  if (!doc.streamURL) {
    return null;
  }

  return {
    id: doc.id,
    title: doc.title || "Untitled",
    artist: doc.artist ?? undefined,
    album: doc.album ?? undefined,
    duration: doc.duration ?? undefined,
    genre: doc.genre ?? undefined,
    language: doc.language ?? undefined,
    streamURL: doc.streamURL,
    coverURL: getCoverURL(doc.coverImage),
  };
}
