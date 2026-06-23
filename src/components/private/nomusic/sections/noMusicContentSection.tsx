"use client";

import { useMemo } from "react";

import { useNomusicPageInfiniteQuery } from "#client-actions/private/nomusic/query";
import NoMusicInfinityObserver from "../elements/NoMusicInfinityObserver";
import { TNomusicFilters } from "#client-actions/private/nomusic/keys";
import { isLanguage } from "#constants/private/nomusic-language";
import { NoMusicEmptyBox } from "../elements/NomusicEmptyBox";
import NoMusicBrowser from "../elements/NoMusicBrowser";
import { TNoMusicPaginated } from "#types/nomusic";
import { useSearchParams } from "next/navigation";
import { QUERY } from "#constants/private/query";
import { TResponse } from "#responses";

// TODO: when route is ?language="", double fetch happens - have to fix that
export function NoMusicContentSection({ res }: TProps) {
  const searchParams = useSearchParams();
  const rawLangValue = searchParams.get(QUERY.LANGUAGE)?.trim();

  const langValue = isLanguage(rawLangValue) ? rawLangValue : undefined;

  const filters = useMemo<TNomusicFilters>(() => {
    if (!langValue) return {};

    return {
      language: langValue,
    };
  }, [langValue]);

  const initialData = res.isSuccess ? res.data : ([] as unknown as TNoMusicPaginated);
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
        queryParam={langValue}
      />
      <NoMusicInfinityObserver query={query} queryParam={langValue} />
    </section>
  );
}

type TProps = {
  res: TResponse<TNoMusicPaginated>;
};
