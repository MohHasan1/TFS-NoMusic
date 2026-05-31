"use client";

import { useCallback, useMemo, useState, useTransition } from "react";

import { TNoMusic, TNoMusicPaginated } from "#types/nomusic";
import { Button } from "#components/ui/button";
import { NoMusicCard } from "../elements/NoMusicCard";
import { NoMusicEmptyCard } from "../elements/NomusicEmptyCard";
import { usePlayerPlay } from "#modules/player/hooks/usePlayerPlay";
import { useQueueActions } from "#modules/queue/hooks/useQueueActions";
import { useRegistryActions } from "#modules/registry/hooks/useRegistryActions";

import { loadMoreNomusicAction } from "@/app/(client)/(private)/test/server";
import { NOMUSIC_PAGINATION } from "#constants/private/pagination";
import { SOURCE_KEYS } from "#constants/private/source";
import { useNomusicInfiniteQuery } from "@/client-actions/queries/hooks/useNomusicInfiniteQuery";

export function NoMusicBrowser({ initialData }: TProps) {
  const { playTrack } = usePlayerPlay();
  const { setQueue, extendQueue } = useQueueActions();
  const { addTracks } = useRegistryActions();

  // const [tracks, setTracks] = useState(nomusic);
  // const [nextPage, setNextPage] = useState(props.nextPage ?? null);
  // const [hasNextPage, setHasNextPage] = useState(Boolean(props.hasNextPage));
  // const [isPending, startTransition] = useTransition();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNomusicInfiniteQuery(initialData);
  const tracks = useMemo(() => {
    return data.pages.flatMap((page) => page.docs);
  }, [data.pages]);

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
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage().then((res) => {
      const newPage = res.data?.pages.at(-1);
      const newTracks = newPage?.docs ?? [];

      addTracks(newTracks);
      extendQueue(newTracks);
    });
  }, [addTracks, extendQueue]);

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
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage  ? "Loading..." : "Load more"}
          </Button>
        ) : null}
      </div>
    </section>
  );
}

type TProps = {
  initialData: TNoMusicPaginated;
};

// useTrackInitialLoad() - regitry and queue
// useTrack
