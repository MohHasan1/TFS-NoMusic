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
  // -- Use the persisted stream URL first. Fall back to uploaded media URL when available.
  const uploadedAudioURL = doc.uploadedAudioURL || getAudioURL(doc.audioFile);
  if (!uploadedAudioURL) {
    return null;
  }

  // -- Extract the Cover Image URL
  const uploadedImageURL = getCoverImageURL(doc.coverImage) || doc.coverImage?.source;

  return {
    id: doc.id,
    title: doc.title || "Untitled",
    artist: doc.artist,
    language: doc.language,
    uploadedAt: doc.updatedAt,
    audioStreamUrl: uploadedAudioURL,
    coverImage: uploadedImageURL,
  };
}
