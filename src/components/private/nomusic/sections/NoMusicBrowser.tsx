"use client";

import type { TNoMusic } from "#types/nomusic";
import { NoMusicCard } from "../elements/NoMusicCard";
import { NoMusicEmptyCard } from "../elements/NomusicEmptyCard";
import { useQueueActions } from "#modules/queue/hooks/useQueueActions";
import { usePlayerPlay } from "@/modules/player/hooks/usePlayerPlay";
import { useRegistryActions } from "#modules/registry/hooks/useRegistryActions";
import { useCallback } from "react";

export function NoMusicBrowser({ nomusic }: TProps) {
  const { playTrack } = usePlayerPlay();
  const { setQueue } = useQueueActions();
  const { addTracks } = useRegistryActions();

  const handleCardClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;

      const cardButton = target.closest("[data-nomusic-index]") as HTMLElement | null;
      if (!cardButton) return;

      const indexValue = cardButton.getAttribute("data-nomusic-index");
      if (!indexValue) return;

      const index = Number(indexValue);

      if (!Number.isInteger(index)) return;

      const selectedTrack = nomusic[index];
      if (!selectedTrack) return;

      const SOURCE_KEY = "page:nomusic";

      // we will use que arc - client queue
      addTracks(nomusic);
      setQueue(`${SOURCE_KEY}:${nomusic.length}`, nomusic, selectedTrack.id);
      playTrack(selectedTrack);
    },
    [addTracks, playTrack, setQueue, nomusic],
  );

  return nomusic.length === 0 ?
    (
      <section className="min-h-80">
        <NoMusicEmptyCard />
      </section>
    ) :
    (
      <section
        onClick={handleCardClick}
        className="grid grid-cols-2 gap-4 pb-40 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      >
        {nomusic.map((track, index) => (
          <NoMusicCard index={index} key={track.id} noMusic={track} />
        ))}
      </section>
    );
}

type TProps = {
  nomusic: TNoMusic[];
};

// useTrackInitialLoad() - regitry and queue
// useTrack
