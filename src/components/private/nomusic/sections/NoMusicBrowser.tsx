"use client";

import { useCallback, useMemo } from "react";

import { TNoMusicPaginated } from "#types/nomusic";
import { Button } from "#components/ui/button";
import { NoMusicCard } from "../elements/NoMusicCard";
import { NoMusicEmptyCard } from "../elements/NomusicEmptyCard";
import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
import { useNomusicPageInfiniteQuery } from "#client-actions/queries/hooks/useNomusicInfiniteQuery";
import { SOURCE_KEYS } from "#constants/private/source";
import { useInView } from "react-intersection-observer";

export function NoMusicBrowser({ initialData }: TProps) {
  const { start, extend } = useTrackPlayback(SOURCE_KEYS.NOMUSIC_PAGE);
  const query = useNomusicPageInfiniteQuery(initialData);

  const { ref } = useInView({
    rootMargin: "300px",
    onChange: (inView) => {
      if (inView) loadMore();
    },
  });

  const tracks = useMemo(() => {
    return query.data.pages.flatMap((page) => page.docs);
  }, [query.data.pages]);

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

      start(tracks, selectedTrack);
    },
    [start, tracks],
  );

  const loadMore = useCallback(() => {
    if (!query.hasNextPage || query.isFetchingNextPage) return;

    query.fetchNextPage().then((res) => {
      const newPage = res.data?.pages.at(-1);
      const newTracks = newPage?.docs ?? [];

      extend(newTracks);
    });
  }, [extend]);

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

      {/* <div className="min-h-dvh"></div> */}

      <div ref={ref} className="flex items-center justify-center pb-40">
        {query.hasNextPage ? (
          <Button size="lg" onClick={loadMore} type="button" variant="outline" disabled={true}>
            {query.isFetchingNextPage ? "Loading..." : "Scroll for more"}
          </Button>
        ) : (
          <Button size="lg" type="button" variant="outline" disabled={true}>
            That all
          </Button>
        )}
      </div>
    </section>
  );
}

type TProps = {
  initialData: TNoMusicPaginated;
};

// useTrackInitialLoad() - regitry and queue
// useTrack
