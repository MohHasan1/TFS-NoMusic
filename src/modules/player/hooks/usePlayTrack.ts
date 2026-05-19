"use client";

import { useCallback } from "react";
import { store } from "#store";
import type { TNoMusic } from "#types/nomusic";
import { noMusicEngine } from "../engine";

const engine = noMusicEngine;

export function usePlayTrack() {
  const setError = store.use.setError();
  const setDuration = store.use.setDuration();
  const setIsPlaying = store.use.setIsPlaying();
  const setIsBuffering = store.use.setIsBuffering();
  const setCurrentTrack = store.use.setCurrentTrack();

  const playNoMusic = useCallback(
    (track: TNoMusic) => {
      // 1.
      setCurrentTrack(track);
      setIsBuffering(true);
      setError(null);

      // 2.
      const promise = engine.play({
        id: track.id, // TODO: not sure if id is needed.
        url: track.audioStreamUrl,
      });

      // 3.
      promise
        ?.then(() => {
          setIsPlaying(true);
          setDuration(engine.getDuration());
        })
        .catch(() => {
          setIsPlaying(false);
          setError("Couldn't play this track.");
        })
        .finally(() => {
          setIsBuffering(false);
        });
    },
    [setCurrentTrack, setIsPlaying, setError, setIsBuffering, setDuration],
  );

  return {
    playNoMusic,
  };
}
