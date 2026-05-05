import type { BrowsableNoMusicDTO } from "@/services/no-music/dto";
import type { NoMusicTrack } from "@/types/no-music.type";

export function mapBrowsableNoMusicToTrack(item: BrowsableNoMusicDTO): NoMusicTrack {
  return {
    id: item.id,
    title: item.title,
    streamUrl: item.streamURL,
    artist: item.artist,
    coverImage: item.coverURL,
  };
}
