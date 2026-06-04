"use client";

import { useMemo } from "react";

import { TNomusicFilters, NOMUSIC_FILTER_FIELDS } from "#client-actions/private/nomusic/keys";
import { useNomusicPageInfiniteQuery } from "#client-actions/private/nomusic/query";
import NoMusicInfinityObserver from "../elements/NoMusicInfinityObserver";
import { isLanguage } from "#constants/private/nomusic-language";
import { NoMusicEmptyBox } from "../elements/NomusicEmptyBox";
import NoMusicBrowser from "../elements/NoMusicBrowser";
import { TNoMusicPaginated } from "#types/nomusic";
import { useSearchParams } from "next/navigation";
import { TResponse } from "#responses";
import { QUERY } from "#constants/private/query";

export function NoMusicContentSection({ res }: TProps) {
  const searchParams = useSearchParams();
  const rawLangValue = searchParams.get(QUERY.LANGUAGE)?.trim();

  const langValue = isLanguage(rawLangValue) ? rawLangValue : undefined;

  const filters = useMemo<TNomusicFilters>(() => {
    if (!langValue) return {};

    return Object.fromEntries(
      NOMUSIC_FILTER_FIELDS.map((field) => [field, langValue]),
    ) as TNomusicFilters;
  }, [langValue]);

  const initialData = res.isSuccess ? res.data : ([] as unknown as TNoMusicPaginated);
  const query = useNomusicPageInfiniteQuery(initialData, filters);

  if (!res.isSuccess)
    return (
      <section>
        <NoMusicEmptyBox />
      </section>
    );

  return (
    <section className="flex-col w-full">
      <NoMusicBrowser isFetching={!query.data} pages={query.data?.pages} queryParam={langValue} />
      <NoMusicInfinityObserver query={query} queryParam={langValue} />
    </section>
  );
}

type TProps = {
  res: TResponse<TNoMusicPaginated>;
};
