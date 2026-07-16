"use client";

import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { store } from "#store";

import { useMemo } from "react";

export function usePlayerTrack() {
  const currentTrack = store.use.currentTrack();
  const trackSourceKey = store.use.queueSourceKey(); // FROM QUEUE SLICE

  // TODO: THIS IS TEMP - we will zustand store
  const trackSourceLabel = useMemo(() => {
    if (!trackSourceKey) return null;

    // Offline NoMusic page
    if (trackSourceKey === OFFLINE_SOURCE_KEYS.NOMUSIC_PAGE()) {
      return "Offline Nomusic Collection";
    }

    // Offline library page
    if (trackSourceKey.startsWith("offline:library:page:")) {
      return "Offline Nomusic Library";
    }

    // Normal NoMusic page
    if (trackSourceKey.startsWith("nomusic:page:")) {
      return "Nomusic Collection";
    }

    // Normal library page
    if (trackSourceKey.startsWith("library:page:")) {
      return "Nomusic Library";
    }

    return "Nomusic";
  }, [trackSourceKey]);

  return {
    track: currentTrack,
    trackSourceLabel,
  };
}
