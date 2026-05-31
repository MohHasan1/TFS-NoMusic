"use client";

import { useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import type { TNoMusicPaginated } from "#types/nomusic";
import { Button } from "#components/ui/button";
import { usePlayerPlay } from "#modules/player/hooks/usePlayerPlay";
import { useQueueActions } from "#modules/queue/hooks/useQueueActions";
import { useRegistryActions } from "#modules/registry/hooks/useRegistryActions";
import { SOURCE_KEYS } from "#constants/private/source";
import { NoMusicCard } from "#components/private/nomusic/elements/NoMusicCard";
import { NoMusicEmptyCard } from "#components/private/nomusic/elements/NomusicEmptyCard";
import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
import { useNomusicPageInfiniteQuery } from "@/client-actions/queries/hooks/useNomusicInfiniteQuery";

export function NoMusicBrowser({ initialData }: { initialData: TNoMusicPaginated }) {
  const { start, extend } = useTrackPlayback(SOURCE_KEYS.NOMUSIC_TEST_PAGE);

  const { ref } = useInView({
    rootMargin: "300px",
    onChange: (inView) => {
      if (inView) loadMore();
    },
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNomusicPageInfiniteQuery(initialData);
  const tracks = useMemo(() => {
    return data.pages.flatMap((page) => page.docs);
  }, [data.pages]);

  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage().then((res) => {
      const newPage = res.data?.pages.at(-1);
      const newTracks = newPage?.docs ?? [];

      extend(newTracks);
    });
  }, [extend]);

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

  if (tracks.length === 0) {
    return (
      <section className="min-h-80">
        <NoMusicEmptyCard />
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col items-center">
      <div
        onClick={handleCardClick}
        className="grid w-full max-w-xl min-h-dvh grid-cols-1 gap-4 pb-20"
      >
        {tracks.map((track, index) => (
          <NoMusicCard key={track.id} index={index} noMusic={track} />
        ))}
      </div>

      <div ref={ref} className="flex items-center justify-center pb-40">
        {hasNextPage ? (
          <Button
            size="lg"
            onClick={loadMore}
            type="button"
            variant="outline"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Scroll for more"}
          </Button>
        ) : null}
      </div>
    </section>
  );
}

// useTrackInitialLoad() - regitry and queue
// useTrack

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
