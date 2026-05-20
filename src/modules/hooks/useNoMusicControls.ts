"use client";

import { useCallback } from "react";
import { store } from "@/store";
import { noMusicEngine } from "../player/engine";
import { QueueEngine } from "../queue/engine";
import type { TNoMusic } from "#types/nomusic";

export function useNoMusicControls() {
  const isPlaying = store.use.isPlaying();
  const isBuffering = store.use.isBuffering();

  const setCurrentTrack = store.use.setCurrentTrack();
  const setIsPlaying = store.use.setIsPlaying();
  const setIsBuffering = store.use.setIsBuffering();
  const setError = store.use.setError();
  const setDuration = store.use.setDuration();
  const setCurrentIndex = store.use.setCurrentIndex();

  const playTrack = useCallback(
    (track: TNoMusic, options?: { restart?: boolean }) => {
      const shouldRestart = options?.restart === true;
      setCurrentTrack(track);
      setIsPlaying(true);
      setError(null);

      const promise = noMusicEngine.play({ id: track.id, url: track.audioStreamUrl }, { restart: shouldRestart });

      promise?.catch(() => {
        setIsPlaying(false);
        setIsBuffering(false);
      });

      setDuration(noMusicEngine.getDuration());
    },
    [setCurrentTrack, setIsPlaying, setError, setIsBuffering, setDuration],
  );

  const togglePlayback = useCallback(() => {
    const currentTrack = store.getState().currentTrack;
    if (!currentTrack) return;

    if (isPlaying) {
      noMusicEngine.pause();
      return;
    }

    playTrack(currentTrack);
  }, [isPlaying, playTrack]);

  const playNextTrack = useCallback(() => {
    const { queue, currentIndex, shuffle, repeatMode } = store.getState();
    const queueEngine = new QueueEngine();
    queueEngine.setState({ queue, currentIndex, shuffle, repeatMode });
    const nextIndex = queueEngine.getNextIndex();

    if (nextIndex === null) {
      noMusicEngine.pause();
      return;
    }

    const nextTrack = queue[nextIndex];
    if (nextTrack) {
      setCurrentIndex(nextIndex);
      playTrack(nextTrack, { restart: true });
    }
  }, [playTrack, setCurrentIndex]);

  const playPrevTrack = useCallback(() => {
    const { queue, currentIndex, shuffle, repeatMode } = store.getState();
    const queueEngine = new QueueEngine();
    queueEngine.setState({ queue, currentIndex, shuffle, repeatMode });
    const prevIndex = queueEngine.getPrevIndex();

    if (prevIndex === null) return;

    const prevTrack = queue[prevIndex];
    if (prevTrack) {
      setCurrentIndex(prevIndex);
      playTrack(prevTrack, { restart: true });
    }
  }, [playTrack, setCurrentIndex]);

  return {
    isPlaying,
    isBuffering,
    togglePlayback,
    playNextTrack,
    playPrevTrack,
  };
}
