import type { Nomusic } from "@/payload-types";
import { getAudioURL, getCoverImageURL } from "@/services/no-music/no-music.helpers";
import type { TNoMusic } from "@/types/nomusic";

export function mapNomusic(nomusic: Nomusic[]): TNoMusic[] {
  return nomusic.flatMap((doc) => {
    const noMusic = mapNomusicToDto(doc);
    return noMusic ? [noMusic] : [];
  });
}

function mapNomusicToDto(doc: Nomusic): TNoMusic | null {
  const audioStreamUrl = doc.uploadedAudioURL || getAudioURL(doc.audioFile);
  if (!audioStreamUrl) return null;

  const coverImage = getCoverImageURL(doc.coverImage);

  return {
    id: doc.id,
    title: doc.name || doc.title || "Untitled",
    artist: doc.artist,
    language: doc.language,
    uploadedAt: doc.updatedAt,
    duration: doc.duration,
    audioStreamUrl,
    coverImage,
  };
}
