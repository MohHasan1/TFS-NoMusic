"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { TNomusicFilters } from "#client-actions/private/nomusic/keys";
import { useNomusicPageInfiniteQuery } from "#client-actions/private/nomusic/query";
import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { QUERY } from "#constants/private/query";
import type { TResponse } from "#responses";
import type { TNoMusicPaginated } from "#types/nomusic";
import NoMusicBrowser from "../elements/NoMusicBrowser";
import NoMusicInfinityObserver from "../elements/NoMusicInfinityObserver";
import { NoMusicEmptyBox } from "../elements/NomusicEmptyBox";

const NoMusicContent = ({ initialNomusic, language }: TProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get(QUERY.SEARCH);

  const filters = useMemo<TNomusicFilters>(() => {
    const next: TNomusicFilters = {};
    if (language) next.language = language;
    if (search) next.search = search;
    return next;
  }, [language, search]);

  // Folds search into the playback source key too, not just language, so a
  // search producing a different track list forces the playback queue to
  // actually rebuild instead of reusing the previous (unfiltered) queue.
  // See queueController.setQueue's same-sourceKey short-circuit.
  const sourceParam = useMemo(() => {
    return [language, search].filter(Boolean).join(":") || undefined;
  }, [language, search]);

  const initialData = initialNomusic.isSuccess ? initialNomusic.data : ([] as unknown as TNoMusicPaginated);
  const query = useNomusicPageInfiniteQuery(initialData, filters);

  if (query.isError)
    return (
      <section>
        <NoMusicEmptyBox />
      </section>
    );

  return (
    <section className="flex-col w-full">
      <NoMusicBrowser isFetching={query.isFetching && !query.isFetchingNextPage} isFetchingNextPage={query.isFetchingNextPage} pages={query.data?.pages} queryParam={sourceParam} />
      <NoMusicInfinityObserver query={query} queryParam={sourceParam} />
    </section>
  );
};

export default NoMusicContent;

type TProps = {
  initialNomusic: TResponse<TNoMusicPaginated>;
  language?: TLANGUAGES_VALUES;
};
