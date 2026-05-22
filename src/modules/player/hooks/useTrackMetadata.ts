"use client";

import { store } from "@/store";

// TODO: rename useCurrentTrackMetadata()
export function useTrackMetadata() {
  const currentTrack = store.use.currentTrack();

  return {
    track: currentTrack,
  };
}
