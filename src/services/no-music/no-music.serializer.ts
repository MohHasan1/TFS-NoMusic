import type { Nomusic } from "@/payload-types";
import type { BrowsableNoMusicDTO } from "@/services/no-music/dto";
import { getAudioURL, getCoverURL, isMedia } from "@/services/no-music/no-music.helpers";

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

  const streamURL = doc.streamURL || getAudioURL(doc.audioFile);
  if (!streamURL) {
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
    streamURL,
    coverURL: getCoverURL(doc.coverImage),
  };
}
