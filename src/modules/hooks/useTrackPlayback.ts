"use client";

// NOTE: NEW
import { useCallback } from "react";

import { store } from "#store";
import type { TNoMusic } from "#types/nomusic";
import { playerController } from "@/modules/player/controller";
import { queueController } from "@/modules/queue/controller";
import { registryController } from "@/modules/registry/controller";

export function useTrackPlayback({ track, tracks }: TUseTrackPlaybackParams) {
  const isActive = store((state) => state.currentTrack?.id === track.id);
  const isPlaying = store((state) => state.currentTrack?.id === track.id && state.isPlaying);

  const playTrack = useCallback(() => {
    registryController.addTracks(tracks);
    queueController.setQueue(tracks, track.id);

    return playerController.playTrack(track);
  }, [track, tracks]);

  return {
    isActive,
    isPlaying,
    playTrack,
  };
}

type TUseTrackPlaybackParams = {
  track: TNoMusic;
  tracks: TNoMusic[];
};
