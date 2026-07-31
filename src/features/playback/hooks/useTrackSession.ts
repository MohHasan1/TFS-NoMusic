"use client";

import { useEffect } from "react";
// import { useRef } from "react"; // needed only by liveRef, below
import { usePlayerActions } from "#playback-player/hooks/usePlayerActions";
import { usePlayerSeek } from "#playback-player/hooks/usePlayerSeek";
import { store } from "#store";
import { useTrackNavigation } from "./useTrackNavigation";

// const SEEK_OFFSET_SECONDS = 4;

export function useTrackSession() {
  const track = store.use.currentTrack();
  // const isPlaying = store.use.isPlaying();
  const { playNext, playPrevious } = useTrackNavigation();
  const { seekTo } = usePlayerSeek();
  // const { currentTime, duration, seekTo } = usePlayerSeek();
  const { pauseTrack, resumeTrack, clearPlayer } = usePlayerActions();

  // liveRef only backs the seekbackward/seekforward handlers below —
  // unused while those stay commented out.
  // const liveRef = useRef({ currentTime, duration });
  // liveRef.current = { currentTime, duration };

  // Runs once per track: registers metadata + all action handlers.
  useEffect(() => {
    if (!track) return;
    if (typeof window === "undefined") return;
    if (!("mediaSession" in navigator)) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.name,
      artist: track.artist || "Unknown Artist",
      artwork: [{ src: track.coverImage || "/nomusic.svg" }],
    });

    navigator.mediaSession.setActionHandler("play", () => {
      resumeTrack();
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      pauseTrack();
    });

    navigator.mediaSession.setActionHandler("stop", () => {
      clearPlayer();
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

    // Commented out on purpose: registering these makes Chrome/Android
    // show seek buttons in the notification instead of nexttrack/previoustrack
    // (no documented way to prefer one pair over the other — see
    // docs/project/MEDIA_SESSION.md). Re-enable if you'd rather have
    // rewind/fast-forward than track skipping in the notification.
    // navigator.mediaSession.setActionHandler("seekbackward", (details) => {
    //   const offset = details.seekOffset ?? SEEK_OFFSET_SECONDS;
    //   seekTo(Math.max(0, liveRef.current.currentTime - offset));
    // });

    // navigator.mediaSession.setActionHandler("seekforward", (details) => {
    //   const offset = details.seekOffset ?? SEEK_OFFSET_SECONDS;
    //   seekTo(liveRef.current.currentTime + offset);
    // });

    return () => {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.setActionHandler("play", null);
      navigator.mediaSession.setActionHandler("pause", null);
      navigator.mediaSession.setActionHandler("stop", null);
      navigator.mediaSession.setActionHandler("nexttrack", null);
      navigator.mediaSession.setActionHandler("previoustrack", null);
      navigator.mediaSession.setActionHandler("seekto", null);
      // navigator.mediaSession.setActionHandler("seekbackward", null);
      // navigator.mediaSession.setActionHandler("seekforward", null);
    };
  }, [track, seekTo, resumeTrack, pauseTrack, clearPlayer, playNext, playPrevious]);

  // Runs every playback tick: keeps the lock-screen progress bar accurate.
  // useEffect(() => {
  //   if (!track) return;
  //   if (typeof window === "undefined") return;
  //   if (!("mediaSession" in navigator)) return;
  //   if (!Number.isFinite(duration) || duration <= 0) return;

  //   navigator.mediaSession.setPositionState({
  //     duration,
  //     playbackRate: 1,
  //     position: Math.min(currentTime, duration),
  //   });

  //   return () => {
  //     navigator.mediaSession.setPositionState();
  //   };
  // }, [track, currentTime, duration]);

  // Runs only when play/pause actually toggles: updates the play/pause icon.
  // useEffect(() => {
  //   if (!track) return;
  //   if (typeof window === "undefined") return;
  //   if (!("mediaSession" in navigator)) return;

  //   navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
  // }, [track, isPlaying]);
}
