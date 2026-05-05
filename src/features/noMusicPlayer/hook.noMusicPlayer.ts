"use client";

import { useCallback, useEffect, useMemo } from "react";

import { noMusicEngine } from "@/features/noMusicPlayer/engine.noMusicPlayer";
import { store } from "@/store";
import type { NoMusicTrack } from "@/types/no-music.type";

const engine = noMusicEngine;

export function useNoMusicPlayer() {
  const currentTrack = store.use.currentTrack();
  const isPlaying = store.use.isPlaying();
  const volume = store.use.volume();
  const currentTime = store.use.currentTime();
  const duration = store.use.duration();
  const setTime = store.use.setTime();
  const setDuration = store.use.setDuration();
  const setCurrentTrack = store.use.setCurrentTrack();
  const setIsPlaying = store.use.setIsPlaying();

  // Starts browser audio playback for a specific track and syncs duration.
  const playAudioForTrack = useCallback(
    (track: NoMusicTrack) => {
      const p = engine.play({
        id: track.id,
        title: track.title,
        url: track.streamUrl,
      });

      if (p) {
        p.catch(() => {
          setIsPlaying(false);
        });
      }

      setDuration(engine.getDuration());
    },
    [setDuration, setIsPlaying],
  );

  // Public action: select a track in state and start playback.
  const playTrack = useCallback(
    (track: NoMusicTrack) => {
      if (currentTrack?.id === track.id && isPlaying) return;

      setCurrentTrack(track);
      playAudioForTrack(track);
    },
    [currentTrack?.id, isPlaying, setCurrentTrack, playAudioForTrack],
  );

  // Toggles playback for the currently selected track.
  const togglePlayback = useCallback(() => {
    if (!currentTrack) return;

    if (isPlaying) {
      engine.pause();
      setIsPlaying(false);
      return;
    }

    playTrack(currentTrack);
  }, [currentTrack, isPlaying, playTrack, setIsPlaying]);

  useEffect(() => {
    engine.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    return engine.subscribeTimeUpdate((t) => {
      setTime(t);
      setDuration(engine.getDuration());
    });
  }, [setDuration, setTime]);

  // Stops audio when the player hook unmounts (for example, after logout redirect).
  useEffect(() => {
    return () => {
      engine.pause();
      setIsPlaying(false);
    };
  }, [setIsPlaying]);

  const progress = useMemo(() => {
    if (duration <= 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    playTrack,
    togglePlayback,
    seek: (time: number) => {
      engine.seek(time);
      setTime(time);
    },
  };
}
