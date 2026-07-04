"use client";

import { useCallback } from "react";

import { usePlayerActions } from "#playback-player/hooks/usePlayerActions";
import { useQueueActions } from "#playback-queue/hooks/useQueueActions";
import { usePlayerPlay } from "#playback-player/hooks/usePlayerPlay";
import type { TNoMusic } from "#types/nomusic";

const useDeleteAudio = () => {
  const { playTrackById } = usePlayerPlay();
  const { clearPlayer } = usePlayerActions();
  const { getCurrentTrackId, deleteById } = useQueueActions();

  const deleteAudio = useCallback(
    (deleteId: TNoMusic["id"]) => {
      const currentTrackId = getCurrentTrackId();
      const isDeletingCurrentTrack = currentTrackId === deleteId;

      const res = deleteById(deleteId);

      if (!isDeletingCurrentTrack) return;

      if (res.nextId == null) {
        clearPlayer();
        return;
      }

      playTrackById(res.nextId);
    },
    [clearPlayer, deleteById, getCurrentTrackId, playTrackById],
  );

  return {
    deleteAudio,
  };
};

export default useDeleteAudio;
