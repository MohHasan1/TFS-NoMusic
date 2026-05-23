"use client";

import { useEffect } from "react";
import type { TNoMusic } from "#types/nomusic";
import { usePlayTrack } from "@/modules/player/hooks/usePlayTrack";
import { useQueueSetup } from "@/modules/queue/hooks/useQueueSetup";
import { NoMusicCard } from "../elements/NoMusicCard";
import { NoMusicEmptyCard } from "../elements/NomusicEmptyCard";
import { store } from "#store";
import { useTrackRegistry } from "@/modules/registry/hooks/useTrackRegistry";

export function NoMusicBrowser({ noMusic }: TProps) {
  // const { setQueue, setCurrentIndex } = useQueueSetup();
  // const { playTrack } = usePlayTrack();
  // const track = store.use.queue();
  // TODO: refcatore
  // useEffect(() => {
  //   setQueue(noMusic);
  // }, [noMusic, setQueue]);

  const { addTracks } = useTrackRegistry();
  const { setQueue } = useQueueSetup();
  const { playTrack } = usePlayTrack();

  if (noMusic.length === 0) {
    return (
      <section className="min-h-80">
        <NoMusicEmptyCard />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 gap-4 pb-40 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {noMusic.map((track) => (
        <NoMusicCard
          key={track.id}
          noMusic={track}
          onSelectFn={() => {
            addTracks(noMusic);
            setQueue(noMusic, track.id);
            playTrack(track);
          }}
        />
      ))}
    </section>
  );
}

type TProps = {
  noMusic: TNoMusic[];
};
