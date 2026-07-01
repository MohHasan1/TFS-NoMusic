"use client";

import type React from "react";
import { useCallback } from "react";

import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { useNomusic } from "#offline/hooks";
import NoMusicEmptyBox from "../elements/NoMusicEmptyBox";
import { OfflineNoMusicCard } from "../elements/OfflineNoMusicCard";

export default function NoMusicContentSection() {
  const { nomusic } = useNomusic();
  const { start } = useTrackPlayback(OFFLINE_SOURCE_KEYS.NOMUSIC_PAGE());

  const handleCardClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;

      const cardButton = target.closest("[data-nomusic-index]") as HTMLElement | null;
      if (!cardButton) return;

      const indexValue = cardButton.getAttribute("data-nomusic-index");
      if (!indexValue) return;

      const index = Number(indexValue);
      if (!Number.isInteger(index)) return;

      const selectedTrack = nomusic[index];
      if (!selectedTrack) return;

      start(nomusic, selectedTrack);
    },
    [nomusic, start],
  );

  return (
    <>
      {nomusic.length === 0 ? (
        <NoMusicEmptyBox />
      ) : (
        <section
          onClick={handleCardClick}
          className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {nomusic.map((noMusic, index) => (
            <OfflineNoMusicCard key={noMusic.id} index={index} noMusic={noMusic} />
          ))}
        </section>
      )}
    </>
  );
}
