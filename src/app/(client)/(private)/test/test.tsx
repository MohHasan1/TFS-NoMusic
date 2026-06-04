"use client";

import { TNomusicFilters } from "#client-actions/private/nomusic/keys";
import { useNomusicPageInfiniteQuery } from "#client-actions/private/nomusic/query";
import { NoMusicCard } from "#components/private/nomusic/elements/NoMusicCard";
import { NoMusicEmptyCard } from "#components/private/nomusic/elements/NomusicEmptyCard";
import { SOURCE_KEYS } from "#constants/private/source";
import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
import { TNoMusicPaginated } from "#types/nomusic";
import { useState, useMemo, useCallback } from "react";
import { useInView } from "react-intersection-observer";

const LANGUAGE_OPTIONS = [
  { label: "All", value: "" },
  { label: "Hindi", value: "hindi" },
  { label: "English", value: "english" },
  { label: "ARABIC", value: "arabic" },
] as const;

export function NoMusicBrowserT({ initialData }: TProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const filters = useMemo<TNomusicFilters>(() => {
    return selectedLanguage ? { language: selectedLanguage } : {};
  }, [selectedLanguage]);

  const query = useNomusicPageInfiniteQuery(initialData, filters);

  const { start, extend } = useTrackPlayback(SOURCE_KEYS.NOMUSIC_PAGE);

  const tracks = useMemo(() => {
    return query.data?.pages.flatMap((page) => page.docs) ?? [];
  }, [query.data?.pages]);

  const loadMore = useCallback(async () => {
    if (!query.hasNextPage || query.isFetchingNextPage) return;

    const res = await query.fetchNextPage();

    const newPage = res.data?.pages.at(-1);
    const newTracks = newPage?.docs ?? [];

    extend(newTracks);
  }, [extend, query.fetchNextPage, query.hasNextPage, query.isFetchingNextPage]);

  const { ref } = useInView({
    rootMargin: "300px",
    onChange: (inView) => {
      if (inView) loadMore();
    },
  });

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

  return (
    <section className="flex-col w-full">
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Browse NoMusic</p>

        <select
          value={selectedLanguage}
          onChange={(event) => setSelectedLanguage(event.target.value)}
          className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {!query.data ? (
        <section className="min-h-80">
          <p className="text-sm text-muted-foreground">Loading songs...</p>
        </section>
      ) : tracks.length === 0 ? (
        <section className="min-h-80">
          <NoMusicEmptyCard />
        </section>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
}

type TProps = {
  initialData: TNoMusicPaginated;
};
