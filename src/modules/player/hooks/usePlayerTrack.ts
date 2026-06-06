"use client";

import { store } from "@/store";

export function usePlayerTrack() {
  const currentTrack = store.use.currentTrack();
  const trackSource = "NoMusic Collection";

  return {
    track: currentTrack,
    trackSource,
  };
}
