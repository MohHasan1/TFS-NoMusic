import { getAudioURL, getCoverImageURL } from "#media-helpers";
import { Nomusic } from "#payload-types";
import { TNoMusic } from "#types/nomusic";

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
    title: doc.title,
    name: doc.name || doc.title || "Untitled",
    artist: doc.artist,
    language: doc.language,
    uploadedAt: doc.updatedAt,
    duration: doc.duration,
    audioStreamUrl,
    coverImage,
  };
}
