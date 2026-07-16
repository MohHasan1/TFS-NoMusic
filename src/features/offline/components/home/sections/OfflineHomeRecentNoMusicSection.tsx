"use client";

import type React from "react";
import { useCallback } from "react";
import { RiArrowRightLine } from "@remixicon/react";

import { OFFLINE_ROUTES } from "#constants/routes";
import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { OfflineCardGridSkeleton } from "#offline/components/shared/OfflineCardGridSkeleton";
import { OfflineLink } from "#offline/components/shared/OfflineLink";
import { OfflineNoMusicCard } from "../../nomusic/elements/OfflineNoMusicCard";
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

  if (isLoading) return <OfflineCardGridSkeleton count={RECENT_COUNT} />;
  if (recent.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary-200">Recently Added NoMusic</h2>

        <OfflineLink
          href={OFFLINE_ROUTES.NOMUSIC}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary-400 hover:text-primary-300"
        >
          View all
          <RiArrowRightLine className="size-3.5" />
        </OfflineLink>
      </div>

      <div
        onClick={handleCardClick}
        className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      >
        {recent.map((noMusic, index) => (
          <OfflineNoMusicCard key={noMusic.id} index={index} noMusic={noMusic} />
        ))}
      </div>
    </section>
  );
}
