"use client";

import { store } from "#store";
import { useEffect } from "react";
import { useTrackNavigation } from "./useTrackNavigation";
import { usePlayerSeekTo } from "#playback-player/hooks/usePlayerSeekTo";


export function useTrackSession() {
  const track = store.use.currentTrack();
  const { playNext, playPrevious } = useTrackNavigation();
  const { seekTo } = usePlayerSeekTo();

  useEffect(() => {
    if (!track) return;
    if (typeof window === "undefined") return;
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.name,
      artist: track.artist || "Unknown Artist",
      artwork: [{ src: track.coverImage || "/nomusic.svg" }],
    });

    navigator.mediaSession.setActionHandler("nexttrack", () => {
      playNext();
    });

    navigator.mediaSession.setActionHandler("previoustrack", () => {
      playPrevious();
    });

    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (details.seekTime !== undefined) {
        seekTo(details.seekTime);
      }
    });

    return () => {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.setActionHandler("nexttrack", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
    };
  }, [track]);
}
