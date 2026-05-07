import type { TNoMusic } from "@/types/nomusic";

export function mapBrowsableNoMusicToTrack(item: TNoMusic): TNoMusic {
  return {
    id: item.id,
    title: item.title,
    audioStreamUrl: item.audioStreamUrl,
    artist: item.artist,
    coverImage: item.coverImage,
    language: item.language,
    uploadedAt: item.uploadedAt,
  };
}
