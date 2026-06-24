"use client";

import React, { useCallback, useMemo } from "react";

import { NoMusicEmptyBox } from "#components/private/nomusic/elements/NomusicEmptyBox";
import { NoMusicGridSkeleton } from "#components/private/nomusic/elements/NoMusicGridSkeleton";
import { NoMusicCard } from "#components/private/nomusic/elements/NoMusicCard";
import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
import { SOURCE_KEYS } from "#constants/private/source";
import { TNoMusicPaginated } from "#types/nomusic";

const NoMusicBrowser = ({ pages, isFetching, queryParam }: TProps) => {
  const { start } = useTrackPlayback(SOURCE_KEYS.NOMUSIC_PAGE(queryParam));

  const tracks = useMemo(() => {
    return pages?.flatMap((page) => page.docs) ?? [];
  }, [pages]);

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

  if (isFetching) {
    return <NoMusicGridSkeleton />;
  }

  if (tracks.length === 0) {
    return (
      <div className="min-h-80">
        <NoMusicEmptyBox />
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="w-full grid grid-cols-2 gap-4 pb-40 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
    >
      {tracks.map((track, index) => (
        <NoMusicCard key={track?.id || index} index={index} noMusic={track} />
      ))}
    </div>
  );
};

export default NoMusicBrowser;

type TProps = {
  queryParam?: string;
  isFetching: boolean;
  pages: TNoMusicPaginated[];
};
