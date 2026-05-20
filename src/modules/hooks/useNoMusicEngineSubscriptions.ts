"use client";

import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import { store } from "@/store";
import { noMusicEngine } from "../player/engine";
import { QueueEngine } from "../queue/engine";

const engine = noMusicEngine;

export function useNoMusicEngineSubscriptions() {
  const setTime = store.use.setTime();
  const setDuration = store.use.setDuration();
  const setIsBuffering = store.use.setIsBuffering();
  const setIsPlaying = store.use.setIsPlaying();
  const setError = store.use.setError();
  const setCurrentTrack = store.use.setCurrentTrack();
  const setCurrentIndex = store.use.setCurrentIndex();

  const playNextTrack = useCallback(() => {
    const { queue, currentIndex, shuffle, repeatMode } = store.getState();
    const queueEngine = new QueueEngine();
    queueEngine.setState({ queue, currentIndex, shuffle, repeatMode });
    const nextIndex = queueEngine.getNextIndex();

    if (nextIndex === null) {
      engine.pause();
      return;
    }

    const nextTrack = queue[nextIndex];
    if (nextTrack) {
      setCurrentTrack(nextTrack);
      setIsPlaying(true);
      setError(null);
      setCurrentIndex(nextIndex);

      const promise = engine.play({ id: nextTrack.id, url: nextTrack.audioStreamUrl }, { restart: true });
      promise?.catch(() => {
        setIsPlaying(false);
        setIsBuffering(false);
      });
      setDuration(engine.getDuration());
    }
  }, [setCurrentTrack, setIsPlaying, setError, setIsBuffering, setDuration, setCurrentIndex]);

  useEffect(() => {
    return engine.subscribeEnded(() => playNextTrack());
  }, [playNextTrack]);

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
}
