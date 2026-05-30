"use client";

import { useCallback, useState, useTransition } from "react";

import { TNoMusic } from "#types/nomusic";
import { Button } from "#components/ui/button";
import { NoMusicCard } from "../elements/NoMusicCard";
import { NoMusicEmptyCard } from "../elements/NomusicEmptyCard";
import { usePlayerPlay } from "#modules/player/hooks/usePlayerPlay";
import { useQueueActions } from "#modules/queue/hooks/useQueueActions";
import { useRegistryActions } from "#modules/registry/hooks/useRegistryActions";

import { loadMoreNomusicAction } from "@/app/(client)/(private)/test/server";
import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { SOURCE_KEYS } from "#constants/private/source";

export function NoMusicBrowser({ nomusic, ...props }: TProps) {
  const { playTrack } = usePlayerPlay();
  const { setQueue } = useQueueActions();
  const { addTracks } = useRegistryActions();

  const [tracks, setTracks] = useState(nomusic);
  const [nextPage, setNextPage] = useState(props.nextPage ?? null);
  const [hasNextPage, setHasNextPage] = useState(Boolean(props.hasNextPage));
  const [isPending, startTransition] = useTransition();

  const handleCardClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;

      const cardButton = target.closest("[data-nomusic-index]") as HTMLElement | null;
      if (!cardButton) return;

      const indexValue = cardButton.getAttribute("data-nomusic-index");
      if (!indexValue) return;

      const index = Number(indexValue);

      if (!Number.isInteger(index)) return;

      const selectedTrack = tracks[index];
      if (!selectedTrack) return;

      // we will use que arc - client queue
      addTracks(tracks);
      setQueue(`${SOURCE_KEYS.NOMUSIC_BROWSER}:${tracks.length}`, tracks, selectedTrack.id);
      playTrack(selectedTrack);
    },
    [addTracks, playTrack, setQueue, tracks],
  );

  const loadMore = useCallback(() => {
    if (!nextPage || isPending) return;

    startTransition(async () => {
      const res = await loadMoreNomusicAction(nextPage, NOMUSIC_PAGINATION.LIMIT);
      if (!res.isSuccess) {
        console.error(res);
        return;
      }

      setTracks((prev) => [...prev, ...res.data.docs]);
      setNextPage(res.data.nextPage ?? null);
      setHasNextPage(res.data.hasNextPage === true);

      // adds message to queue
    });
  }, [nextPage, isPending]);

  return tracks.length === 0 ? (
    <section className="min-h-80">
      <NoMusicEmptyCard />
    </section>
  ) : (
    <section className="flex-col w-full">
      <div
        onClick={handleCardClick}
        className="w-full grid grid-cols-2 gap-4 pb-40 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      >
        {tracks.map((track, index) => (
          <NoMusicCard key={track.id} index={index} noMusic={track} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        {hasNextPage ? (
          <Button
            size={"lg"}
            type="button"
            variant={"outline"}
            onClick={loadMore}
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Load more"}
          </Button>
        ) : null}
      </div>
    </section>
  );
}

type TProps = {
  nomusic: TNoMusic[];
  page?: number | null;
  nextPage?: number | null;
  hasNextPage?: boolean | null;
};

// useTrackInitialLoad() - regitry and queue
// useTrack
