"use client";

import { useCallback, useEffect } from "react";

import { noMusicEngine } from "./player/engine";
import { useNoMusicPlayer } from "./player/hook";
import { useNoMusicQueue } from "./queue/hook";

export function useNoMusicPlaybackController() {
  const { next, prev } = useNoMusicQueue();
  const player = useNoMusicPlayer();
  const { playTrack } = player;

  const playNextTrack = useCallback(() => {
    const nextTrack = next();
    if (!nextTrack) {
      noMusicEngine.pause();
      return;
    }
    playTrack(nextTrack, { restart: true });
  }, [next, playTrack]);

  const playPrevTrack = useCallback(() => {
    const prevTrack = prev();
    if (!prevTrack) return;
    playTrack(prevTrack, { restart: true });
  }, [prev, playTrack]);

  useEffect(() => {
    return noMusicEngine.subscribeEnded(() => playNextTrack());
  }, [playNextTrack]);

  return {
    ...player,
    playNextTrack,
    playPrevTrack,
  };
}
