"use client";

import { TNomusicFilters, NOMUSIC_FILTER_FIELDS } from "#client-actions/private/nomusic/keys";
import { useNomusicPageInfiniteQuery } from "#client-actions/private/nomusic/query";
import NoMusicInfinityObserver from "../elements/NoMusicInfinityObserver";
import NoMusicBrowser from "../elements/NoMusicBrowser";
import { TNoMusicPaginated } from "#types/nomusic";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export function NoMusicContentSection({ initialData }: TProps) {
  const searchParams = useSearchParams();

  const filters = useMemo<TNomusicFilters>(() => {
    return Object.fromEntries(
      NOMUSIC_FILTER_FIELDS.flatMap((field) => {
        const value = searchParams.get(field)?.trim();
        return value ? [[field, value]] : [];
      }),
    ) as TNomusicFilters;
  }, [searchParams]);

  const query = useNomusicPageInfiniteQuery(initialData, filters);

  return (
    <section className="flex-col w-full">
      <NoMusicBrowser isFetching={!query.data} pages={query.data?.pages} />
      <NoMusicInfinityObserver query={query} />
    </section>
  );
}

type TProps = {
  initialData: TNoMusicPaginated;
};
