"use client";

import type { TNoMusic } from "#types/nomusic";
import { NoMusicCard } from "../elements/NoMusicCard";
import { NoMusicEmptyCard } from "../elements/NomusicEmptyCard";
import { useQueueActions } from "#modules/queue/hooks/useQueueActions";
import { usePlayerPlay } from "@/modules/player/hooks/usePlayerPlay";
import { useRegistryActions } from "#modules/registry/hooks/useRegistryActions";

export function NoMusicBrowser({ nomusic }: TProps) {
  const { playTrack } = usePlayerPlay();
  const { addTracks } = useRegistryActions();
  const { setQueue } = useQueueActions();

  if (nomusic.length === 0) {
    return (
      <section className="min-h-80">
        <NoMusicEmptyCard />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-4 pb-40 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {nomusic.map((track) => (
        <NoMusicCard
          key={track.id}
          noMusic={track}
          onSelectFn={() => {
            addTracks(nomusic);
            setQueue("page:nomusic", nomusic, track.id);
            playTrack(track);
          }}
        />
      ))}
    </section>
  );
}

type TProps = {
  nomusic: TNoMusic[];
};

// useTrackInitialLoad() - regitry and queue
// useTrack
