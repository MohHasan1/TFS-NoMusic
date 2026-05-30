"use client";

import { useCallback, useState, useTransition } from "react";

import type { TNoMusic } from "#types/nomusic";
import { usePlayerPlay } from "@/modules/player/hooks/usePlayerPlay";
import { useQueueActions } from "#modules/queue/hooks/useQueueActions";
import { useRegistryActions } from "#modules/registry/hooks/useRegistryActions";
import { NoMusicCard } from "#components/private/nomusic/elements/NoMusicCard";
import { NoMusicEmptyCard } from "#components/private/nomusic/elements/NomusicEmptyCard";
import { loadMoreNomusicAction } from "./server";

type TInitialData = {
  docs: TNoMusic[];
  page?: number | null;
  nextPage?: number | null;
  hasNextPage?: boolean | null;
};

const SOURCE_KEY = "page:nomusic:pg";

export function NoMusicBrowser({ initialData }: { initialData: TInitialData }) {
  const [tracks, setTracks] = useState(initialData.docs);
  const [nextPage, setNextPage] = useState(initialData.nextPage ?? null);
  const [hasNextPage, setHasNextPage] = useState(Boolean(initialData.hasNextPage));
  const [isPending, startTransition] = useTransition();

  const { playTrack } = usePlayerPlay();
  const { addTracks } = useRegistryActions();
  const { setQueue } = useQueueActions();

  const loadMore = useCallback(() => {
    if (!nextPage || isPending) return;

    startTransition(async () => {
      const res = await loadMoreNomusicAction(nextPage);

      if (!res.isSuccess) {
        console.error(res);
        return;
      }

      setTracks((prev) => [...prev, ...res.data.docs]);
      setNextPage(res.data.nextPage ?? null);
      setHasNextPage(res.data.hasNextPage === true);

      // adds message
    });
  }, [nextPage, isPending]);

  const handleGridClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;

      const cardButton = target.closest("[data-nomusic-index]") as HTMLElement | null;
      if (!cardButton) return;

      const indexValue = cardButton.dataset.nomusicIndex;
      if (!indexValue) return;

      const index = Number(indexValue);

      if (!Number.isInteger(index)) return;

      const selectedTrack = tracks[index];
      if (!selectedTrack) return;

      // we will use que arc - client queue
      addTracks(tracks);
      setQueue(`${SOURCE_KEY}:${tracks.length}`, tracks, selectedTrack.id);

      playTrack(selectedTrack);
    },
    [addTracks, playTrack, setQueue, tracks],
  );

  if (tracks.length === 0) {
    return (
      <section className="border min-h-80">
        <NoMusicEmptyCard />
      </section>
    );
  }

  return (
    <>
      <section
        onClick={handleGridClick}
        className="border grid grid-cols-2 gap-4 pb-10 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      >
        {tracks.map((track, i) => (
          <NoMusicCard key={track.id} noMusic={track} index={i} />
        ))}
      </section>

      {hasNextPage ? (
        <button type="button" onClick={loadMore} disabled={isPending}>
          {isPending ? "Loading..." : "Load more"}
        </button>
      ) : null}
    </>
  );
}

// places where queu will be chekced. after user click a song, after user press nect or prev, after a song finish playing

// audio error fix
// try {
//   await audio.play();
// } catch (error) {
//   if (error instanceof DOMException && error.name === "AbortError") {
//     return;
//   }

//   console.error(error);
// }
