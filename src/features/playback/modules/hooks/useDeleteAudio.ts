"use client";

import { useCallback } from "react";

import { usePlayerActions } from "#playback-player/hooks/usePlayerActions";
import { useQueueActions } from "#playback-queue/hooks/useQueueActions";
import { usePlayerPlay } from "#playback-player/hooks/usePlayerPlay";
import type { TNoMusic } from "#types/nomusic";

const useDeleteAudio = (sourceKey: string) => {
  const { playTrackById } = usePlayerPlay();
  const { clearPlayer } = usePlayerActions();
  const { deleteById } = useQueueActions();

  const deleteAudio = useCallback(
    (deleteId: TNoMusic["id"]) => {
      const res = deleteById(sourceKey, deleteId);

      // Source key did not match active queue, so do not touch player.
      if (!res.didDeleteFromQueue) return;

      // Deleted song was not the currently playing song.
      if (!res.wasCurrentTrack) return;

      // Deleted current song and there is no next song.
      if (res.nextId == null) {
        clearPlayer();
        return;
      }

      // Deleted current song and queue has a replacement.
      playTrackById(res.nextId);
    },
    [clearPlayer, deleteById, playTrackById, sourceKey],
  );

  return {
    deleteAudio,
  };
};

export default useDeleteAudio;
