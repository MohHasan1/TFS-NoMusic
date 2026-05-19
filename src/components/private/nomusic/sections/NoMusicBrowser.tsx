"use client";

import { useEffect } from "react";
import { usePlayTrack } from "#features/nomusic/player/hooks/usePlayTrack";
import { useQueueSetup } from "#features/nomusic/queue/hooks/useQueueSetup";
import type { TNoMusic } from "#types/nomusic";

import { NoMusicCard } from "../elements/NoMusicCard";
import { NoMusicEmptyCard } from "../elements/NomusicEmptyCard";

export function NoMusicBrowser({ noMusic }: TProps) {
  const { setQueue, setCurrentIndex } = useQueueSetup();
  const { playNoMusic } = usePlayTrack();

  // TODO: refcatore
  useEffect(() => {
    setQueue(noMusic);
  }, [noMusic, setQueue]);

  if (noMusic.length === 0) {
    return (
      <section className="min-h-80">
        <NoMusicEmptyCard />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-4 pb-40 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {noMusic.map((track, index) => (
        <NoMusicCard
          key={track.id}
          noMusic={track}
          onSelectFn={() => {
            setCurrentIndex(index);
            playNoMusic(track);
          }}
        />
      ))}
    </section>
  );
}

type TProps = {
  noMusic: TNoMusic[];
};
