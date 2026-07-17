"use client";

import { useMemo } from "react";

import { useNomusicPageInfiniteQuery } from "#client-actions/private/nomusic/query";
import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import NoMusicInfinityObserver from "../elements/NoMusicInfinityObserver";
import { TNomusicFilters } from "#client-actions/private/nomusic/keys";
import { NoMusicEmptyBox } from "../elements/NomusicEmptyBox";
import NoMusicBrowser from "../elements/NoMusicBrowser";
import { TNoMusicPaginated } from "#types/nomusic";
import { TResponse } from "#responses";

const NoMusicContent = ({ initialNomusic, language }: TProps) => {
  const filters = useMemo<TNomusicFilters>(() => {
    if (!language) return {};

    return {
      language,
    };
  }, [language]);

  const initialData = initialNomusic.isSuccess
    ? initialNomusic.data
    : ([] as unknown as TNoMusicPaginated);
  const query = useNomusicPageInfiniteQuery(initialData, filters);

  if (query.isError)
    return (
      <section>
        <NoMusicEmptyBox />
      </section>
    );

  return (
    <section className="flex-col w-full">
      <NoMusicBrowser
        isFetching={query.isFetching && !query.isFetchingNextPage}
        pages={query.data?.pages}
        queryParam={language}
      />
      <NoMusicInfinityObserver query={query} queryParam={language} />
    </section>
  );
};

export default NoMusicContent;

type TProps = {
  initialNomusic: TResponse<TNoMusicPaginated>;
  language?: TLANGUAGES_VALUES;
};
