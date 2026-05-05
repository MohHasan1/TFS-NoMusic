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
  const setTrackQueueState = store.use.setTrackQueue();
  const setCurrentTrack = store.use.setCurrentTrack();
  const setIsPlaying = store.use.setIsPlaying();
  const goToNextTrack = store.use.goToNextTrack();
  const goToPrevTrack = store.use.goToPrevTrack();

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

  const playTrack = useCallback(
    (track: NoMusicTrack) => {
      if (currentTrack?.id === track.id && isPlaying) return;

      setCurrentTrack(track);
      playAudioForTrack(track);
    },
    [currentTrack?.id, isPlaying, setCurrentTrack, playAudioForTrack],
  );

  const togglePlayback = useCallback(() => {
    if (!currentTrack) return;

    if (isPlaying) {
      engine.pause();
      setIsPlaying(false);
      return;
    }

    playTrack(currentTrack);
  }, [currentTrack, isPlaying, playTrack, setIsPlaying]);

  const setTrackQueue = useCallback(
    (tracks: NoMusicTrack[]) => {
      setTrackQueueState(tracks);
    },
    [setTrackQueueState],
  );

  const playNextTrack = useCallback(() => {
    goToNextTrack();
    const nextTrack = store.getState().currentTrack;

    if (!nextTrack) {
      engine.pause();
      setIsPlaying(false);
      return;
    }

    playAudioForTrack(nextTrack);
  }, [goToNextTrack, playAudioForTrack, setIsPlaying]);

  const playPrevTrack = useCallback(() => {
    goToPrevTrack();
    const prevTrack = store.getState().currentTrack;

    if (!prevTrack) return;

    playAudioForTrack(prevTrack);
  }, [goToPrevTrack, playAudioForTrack]);

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
      playNextTrack();
    });
  }, [playNextTrack]);

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
    togglePlayback,
    playNextTrack,
    playPrevTrack,
    seek: (time: number) => {
      engine.seek(time);
      setTime(time);
    },
  };
}
