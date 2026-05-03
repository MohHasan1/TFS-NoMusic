import { listBrowsableNoMusic as listBrowsableNoMusicFromAdapter } from "@/services/no-music/no-music-pl.adapter";

export async function listBrowsableNoMusic() {
  return listBrowsableNoMusicFromAdapter();
}
