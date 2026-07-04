import { store } from "#store";
import type { TNoMusic } from "#types/nomusic";

import { registryEngine } from "../engine";

class RegistryController {
  addTracks(tracks: TNoMusic[]) {
    const { tracksById, setTracksById } = store.getState();

    const nextTracksById = registryEngine.createTracksById(tracksById, tracks);
    setTracksById(nextTracksById);
  }

  getTrackById(trackId: TNoMusic["id"]) {
    return registryEngine.getTrackById(store.getState().tracksById, trackId);
  }

  clearRegistry() {
    store.getState().clearRegistry();
  }
}

export const registryController = new RegistryController();
