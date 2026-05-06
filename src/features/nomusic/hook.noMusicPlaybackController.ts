"use client";

import { useCallback, useEffect } from "react";

import { noMusicEngine } from "@/features/noMusicPlayer/engine.noMusicPlayer";
import { useNoMusicPlayer } from "@/features/noMusicPlayer/hook.noMusicPlayer";
import { useNoMusicQueue } from "@/features/noMusicQueue/hook.noMusicQueue";
import { store } from "@/store";

export function useNoMusicPlaybackController() {
  const { next, prev } = useNoMusicQueue();
  const player = useNoMusicPlayer();
  const { playTrack } = player;
  const setIsPlaying = store.use.setIsPlaying();

  const playNextTrack = useCallback(() => {
    const nextTrack = next();
    if (!nextTrack) {
      noMusicEngine.pause();
      setIsPlaying(false);
      return;
    }

    playTrack(nextTrack, { restart: true });
  }, [next, playTrack, setIsPlaying]);

  const playPrevTrack = useCallback(() => {
    const prevTrack = prev();
    if (prevTrack) {
      playTrack(prevTrack, { restart: true });
    }
  }, [playTrack, prev]);

  useEffect(() => {
    return noMusicEngine.subscribeEnded(() => {
      playNextTrack();
    });
  }, [playNextTrack]);

  return {
    ...player,
    playNextTrack,
    playPrevTrack,
  };
}
