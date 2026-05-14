"use client";

import { useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";

import type { TNoMusic } from "@/types/nomusic";
import { store } from "@/store";
import { noMusicEngine } from "./engine.noMusicPlayer";

const engine = noMusicEngine;

export function useNoMusicPlayer() {
  const currentTrack = store.use.currentTrack();
  const isPlaying = store.use.isPlaying();
  const isBuffering = store.use.isBuffering();
  const error = store.use.error();
  const volume = store.use.volume();
  const currentTime = store.use.currentTime();
  const duration = store.use.duration();

  const setCurrentTrack = store.use.setCurrentTrack();
  const setIsPlaying = store.use.setIsPlaying();
  const setIsBuffering = store.use.setIsBuffering();
  const setError = store.use.setError();
  const setTime = store.use.setTime();
  const setDuration = store.use.setDuration();
  const setVolume = store.use.setVolume();

  const playTrack = useCallback(
    (track: TNoMusic, options?: { restart?: boolean }) => {
      const shouldRestart = options?.restart === true;
      const isSameTrack = currentTrack?.id === track.id;

      if (isSameTrack && isPlaying && !shouldRestart) return;

      setCurrentTrack(track);
      setIsPlaying(true);
      setError(null);

      const promise = engine.play(
        { id: track.id, title: track.title, url: track.audioStreamUrl },
        { restart: shouldRestart },
      );

      promise?.catch(() => {
        setIsPlaying(false);
        setIsBuffering(false);
      });

      setDuration(engine.getDuration());
    },
    [currentTrack?.id, isPlaying, setCurrentTrack, setIsPlaying, setError, setIsBuffering, setDuration],
  );

  const togglePlayback = useCallback(() => {
    if (!currentTrack) return;

    if (isPlaying) {
      engine.pause();
      return;
    }

    playTrack(currentTrack);
  }, [currentTrack, isPlaying, playTrack]);

  const seek = useCallback(
    (time: number) => {
      engine.seek(time);
      setTime(time);
    },
    [setTime],
  );

  const updateVolume = useCallback(
    (next: number) => {
      const clamped = Math.min(1, Math.max(0, next));
      setVolume(clamped);
      engine.setVolume(clamped);
    },
    [setVolume],
  );

  useEffect(() => {
    engine.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    return engine.subscribeTimeUpdate((t) => {
      setTime(t);
      setDuration(engine.getDuration());
    });
  }, [setTime, setDuration]);

  useEffect(() => {
    return engine.subscribeBuffering(setIsBuffering);
  }, [setIsBuffering]);

  useEffect(() => {
    return engine.subscribePlayState(setIsPlaying);
  }, [setIsPlaying]);

  useEffect(() => {
    return engine.subscribeError((message) => {
      setError(message);
      if (message) toast.error(message);
    });
  }, [setError]);

  const progress = useMemo(() => {
    if (duration <= 0) return 0;
    return Math.min(100, Math.max(0, (currentTime / duration) * 100));
  }, [currentTime, duration]);

  return {
    currentTrack,
    isPlaying,
    isBuffering,
    error,
    currentTime,
    duration,
    progress,
    volume,
    playTrack,
    togglePlayback,
    seek,
    setVolume: updateVolume,
  };
}
