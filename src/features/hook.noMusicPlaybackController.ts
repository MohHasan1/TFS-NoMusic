"use client";

import { useCallback, useEffect } from "react";

import { noMusicEngine } from "@/features/noMusicPlayer/engine.noMusicPlayer";
import { useNoMusicPlayer } from "@/features/noMusicPlayer/hook.noMusicPlayer";
import { useNoMusicQueue } from "@/features/noMusicQueue/hook.noMusicQueue";

export function useNoMusicPlaybackController() {
  const { next, prev } = useNoMusicQueue();
  const player = useNoMusicPlayer();
  const { playTrack } = player;

  const playNextTrack = useCallback(() => {
    const nextTrack = next();
    if (nextTrack) {
      playTrack(nextTrack);
    }
  }, [next, playTrack]);

  const playPrevTrack = useCallback(() => {
    const prevTrack = prev();
    if (prevTrack) {
      playTrack(prevTrack);
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
