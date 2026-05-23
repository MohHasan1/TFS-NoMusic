import type { TNoMusic } from "#types/nomusic";

export class RegistryEngine {
  createTracksById(currentTracksById: Record<string, TNoMusic>, tracks: TNoMusic[]) {
    const nextTracksById = { ...currentTracksById };

    for (const track of tracks) {
      nextTracksById[String(track.id)] = track;
    }

    return nextTracksById;
  }

  getTrackById(tracksById: Record<string, TNoMusic>, trackId: TNoMusic["id"]) {
    return tracksById[String(trackId)] ?? null;
  }
}

export const registryEngine = new RegistryEngine();
