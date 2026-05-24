"use client";

import { store } from "@/store";

export function usePlayerTrack() {
  const currentTrack = store.use.currentTrack();

  return {
    track: currentTrack,
  };
}
