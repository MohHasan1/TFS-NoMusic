"use client";

import { useInView } from "react-intersection-observer";
import { useCallback, useMemo } from "react";

import { useNomusicPageInfiniteQuery } from "#client-actions/private/nomusic/query";
import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
import { SOURCE_KEYS } from "#constants/private/source";
import { TNoMusicPaginated } from "#types/nomusic";

import { NoMusicEmptyCard } from "../elements/NomusicEmptyCard";
import { NoMusicCard } from "../elements/NoMusicCard";

export function NoMusicBrowser({ initialData }: TProps) {
  const query = useNomusicPageInfiniteQuery(initialData);

  const { start, extend } = useTrackPlayback(SOURCE_KEYS.NOMUSIC_PAGE);

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

  const loadMore = useCallback(async () => {
    if (!query.hasNextPage || query.isFetchingNextPage) return;

    const res = await query.fetchNextPage();

    const newPage = res.data?.pages.at(-1);
    const newTracks = newPage?.docs ?? [];

    extend(newTracks);
  }, [extend, query.fetchNextPage, query.hasNextPage, query.isFetchingNextPage]);

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

      <div className="flex items-center justify-center pb-40">
        {query.hasNextPage ? (
          <div ref={ref} className="h-10 pb-40" />
        ) : (
          <p className="text-sm text-muted-foreground">
            That's all - server cat is out of songs 🐾
          </p>
        )}
      </div>
    </section>
  );
}

type TProps = {
  initialData: TNoMusicPaginated;
};
