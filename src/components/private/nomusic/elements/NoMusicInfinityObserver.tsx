import { DefinedUseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useCallback } from "react";

import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
import { SOURCE_KEYS } from "#constants/private/source";
import { TNoMusicPaginated } from "#types/nomusic";

const NoMusicInfinityObserver = ({ query, queryParam }: TProps) => {
  const { extend } = useTrackPlayback(SOURCE_KEYS.NOMUSIC_PAGE(queryParam));

  const { ref } = useInView({
    rootMargin: "300px",
    onChange: (inView) => {
      if (inView) loadMore();
    },
  });

  const loadMore = useCallback(async () => {
    if (!query.hasNextPage || query.isFetchingNextPage) return;

    const res = await query.fetchNextPage();
    const newPage = res.data?.pages.at(-1);
    const newTracks = newPage?.docs ?? [];

    extend(newTracks);
  }, [extend, query.fetchNextPage, query.hasNextPage, query.isFetchingNextPage]);

  return (
    <div className="flex items-center justify-center pb-40">
      {query.hasNextPage ? (
        <div ref={ref} className="h-10 pb-40" />
      ) : (
        <p className="text-sm text-muted-foreground">That's all - server cat is out of songs 🐾</p>
      )}
    </div>
  );
};

export default NoMusicInfinityObserver;

type TProps = {
  queryParam?: string;
  query: DefinedUseInfiniteQueryResult<InfiniteData<TNoMusicPaginated, unknown>, Error>;
};
