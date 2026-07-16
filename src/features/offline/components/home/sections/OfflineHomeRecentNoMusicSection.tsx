"use client";

import type React from "react";
import { useCallback } from "react";

import { OFFLINE_ROUTES } from "#constants/routes";
import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { OfflineHomeAudioCard } from "../elements/OfflineHomeAudioCard";
import { OfflineHomeAudioCardSkeleton } from "../elements/OfflineHomeAudioCardSkeleton";
import { OfflineHomeSectionHeader } from "../elements/OfflineHomeSectionHeader";
import { useTrackPlayback } from "#playback/hooks/useTrackPlayback";
import { useNomusic } from "#offline/hooks";

const RECENT_COUNT = 4;

export default function OfflineHomeRecentNoMusicSection() {
  const { nomusic: recent, isLoading } = useNomusic(RECENT_COUNT);
  const { start } = useTrackPlayback(OFFLINE_SOURCE_KEYS.HOME_RECENT());

  const handleCardClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;

      const cardButton = target.closest("[data-nomusic-index]") as HTMLElement | null;
      if (!cardButton) return;

      const indexValue = cardButton.getAttribute("data-nomusic-index");
      if (!indexValue) return;

      const index = Number(indexValue);
      if (!Number.isInteger(index)) return;

      const selectedTrack = recent[index];
      if (!selectedTrack) return;

      start(recent, selectedTrack);
    },
    [recent, start],
  );

  if (isLoading) {
    return (
      <section className="space-y-4">
        <OfflineHomeSectionHeader
          title="Recently Added NoMusic"
          href={OFFLINE_ROUTES.NOMUSIC}
          linkLabel="View NoMusic"
        />

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: RECENT_COUNT }, (_, index) => (
            <OfflineHomeAudioCardSkeleton key={`audio-skeleton-${index + 1}`} />
          ))}
        </div>
      </section>
    );
  }

  if (recent.length === 0) return null;

  return (
    <section className="space-y-4">
      <OfflineHomeSectionHeader
        title="Recently Added NoMusic"
        href={OFFLINE_ROUTES.NOMUSIC}
        linkLabel="View NoMusic"
      />

      <div
        onClick={handleCardClick}
        className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      >
        {recent.map((noMusic, index) => (
          <OfflineHomeAudioCard key={noMusic.id} index={index} noMusic={noMusic} />
        ))}
      </div>
    </section>
  );
}
