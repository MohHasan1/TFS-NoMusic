import { usePlayerPlay } from "#modules/player/hooks/usePlayerPlay";
import { useQueueActions } from "#modules/queue/hooks/useQueueActions";
import { useRegistryActions } from "#modules/registry/hooks/useRegistryActions";
import { TNoMusic } from "#types/nomusic";
import { useCallback } from "react";

export function useTrackPlayback(sourceKey: string) {
  const { playTrack } = usePlayerPlay();
  const { setQueue, extendQueue } = useQueueActions();
  const { addTracks } = useRegistryActions();

  const start = useCallback(
    (tracks: TNoMusic[], selectedTrack: TNoMusic) => {
      addTracks(tracks);
      setQueue(sourceKey, tracks, selectedTrack.id);
      playTrack(selectedTrack);
    },
    [addTracks, playTrack, setQueue, sourceKey],
  );

  const extend = useCallback(
    (tracks: TNoMusic[]) => {
      if (tracks.length === 0) return;

      addTracks(tracks);
      extendQueue(sourceKey, tracks);
    },
    [addTracks, extendQueue, sourceKey],
  );

  return {
    start,
    extend,
  };
}
