"use client";

import { store } from "@/store";

export function useTrackMetadata() {
  const currentTrack = store.use.currentTrack();

  return {
    track: currentTrack,
  };
}
