import {
  getAudioURL,
  getCoverImageURL,
  isMedia,
} from "@/services/no-music/no-music.helpers";
import type { TNoMusic } from "@/types/nomusic";
import type { Nomusic } from "@/payload-types";

export function mapNomusic(nomusic: Nomusic[]): TNoMusic[] {
  return nomusic.flatMap((doc) => {
    const noMusic = mapNomusicToDto(doc);
    return noMusic ? [noMusic] : [];
  });
}

function mapNomusicToDto(doc: Nomusic): TNoMusic | null {
  // -- Skip nomsusic if no audioFile is presnt:
  if (!isMedia(doc.audioFile) || doc.audioFile.type !== "audio") {
    return null;
  }

  // -- Extract the audio URL
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
