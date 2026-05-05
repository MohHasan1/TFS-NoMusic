"use client";

import { useCallback, useEffect, useMemo } from "react";

import { noMusicEngine } from "@/features/noMusicPlayer/engine.noMusicPlayer";
import type { NoMusicTrack } from "@/features/noMusicPlayer/slice.noMusicPlayer";
import { store } from "@/store";

const engine = noMusicEngine;

export function useNoMusicPlayer() {
  const currentTrack = store.use.currentTrack();
  const isPlaying = store.use.isPlaying();
  const volume = store.use.volume();
  const currentTime = store.use.currentTime();
  const duration = store.use.duration();
  const setTime = store.use.setTime();
  const setDuration = store.use.setDuration();
  const setQueue = store.use.setQueue();
  const play = store.use.play();
  const pause = store.use.pause();
  const next = store.use.next();
  const prev = store.use.prev();

  const startPlayback = useCallback(
    (track: NoMusicTrack) => {
      const p = engine.play({
        id: track.id,
        title: track.title,
        url: track.streamUrl,
      });

      if (p) {
        p.catch(() => {
          pause();
        });
      }

      setDuration(engine.getDuration());
    },
    [pause, setDuration],
  );

  const playTrack = useCallback(
    (track: NoMusicTrack) => {
      if (currentTrack?.id === track.id && isPlaying) return;

      play(track);
      startPlayback(track);
    },
    [currentTrack?.id, isPlaying, play, startPlayback],
  );

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;

    if (isPlaying) {
      engine.pause();
      pause();
      return;
    }

    playTrack(currentTrack);
  }, [currentTrack, isPlaying, pause, playTrack]);

  const setTrackQueue = useCallback(
    (tracks: NoMusicTrack[]) => {
      setQueue(tracks);
    },
    [setQueue],
  );

  const playNext = useCallback(() => {
    next();
    const nextTrack = store.getState().currentTrack;

    if (!nextTrack) {
      engine.pause();
      pause();
      return;
    }

    startPlayback(nextTrack);
  }, [next, pause, startPlayback]);

  const playPrev = useCallback(() => {
    prev();
    const prevTrack = store.getState().currentTrack;

    if (!prevTrack) return;

    startPlayback(prevTrack);
  }, [prev, startPlayback]);

  useEffect(() => {
    engine.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    return engine.subscribeTimeUpdate((t) => {
      setTime(t);
      setDuration(engine.getDuration());
    });
  }, [setDuration, setTime]);

  useEffect(() => {
    return engine.subscribeEnded(() => {
      playNext();
    });
  }, [playNext]);

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
    setTrackQueue,
    toggle: togglePlay,
    next: playNext,
    prev: playPrev,
    seek: (time: number) => {
      engine.seek(time);
      setTime(time);
    },
  };
}
