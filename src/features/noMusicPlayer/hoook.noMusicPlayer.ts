"use client";

import { useEffect, useMemo } from "react";

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
  const play = store.use.play();
  const pause = store.use.pause();
  const next = store.use.next();
  const prev = store.use.prev();

  const playTrack = (track: NoMusicTrack) => {
    // void engine
    //   .play({
    //     id: track.id,
    //     title: track.title,
    //     url: track.streamUrl,
    //   })
    //   ?.catch(() => {
    //     pause();
    //   });

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

    play(track);
    setDuration(engine.getDuration());
  };

  const togglePlay = () => {
    if (!currentTrack) return;

    if (isPlaying) {
      engine.pause();
      pause();
      return;
    }

    playTrack(currentTrack);
  };

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
      next();
    });
  }, [next]);

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
    toggle: togglePlay,
    next,
    prev,
    seek: (time: number) => {
      engine.seek(time);
      setTime(time);
    },
  };
}
