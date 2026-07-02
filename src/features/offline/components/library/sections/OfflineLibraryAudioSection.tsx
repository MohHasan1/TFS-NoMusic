"use client";

import type React from "react";

import { OfflineLibraryAudioEmptyBox } from "../elements/OfflineLibraryAudioEmptyBox";
import { OfflineLibraryAudioSkeleton } from "../elements/OfflineLibraryAudioSkeleton";
import { OfflineLibraryTrackRow } from "../elements/OfflineLibraryTrackRow";
import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import type { TLibraryOffline } from "#offline/types";
import { useNomusicByLibId } from "#offline/hooks";

export function OfflineLibraryAudioSection({ libId }: TProps) {
  const { nomusic, isLoading } = useNomusicByLibId(libId);
  const { start } = useTrackPlayback(OFFLINE_SOURCE_KEYS.LIBRARY_PAGE(libId));

  const handleRowClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    const row = target.closest("[data-library-audio-index]") as HTMLElement | null;
    if (!row) return;

    const indexValue = row.getAttribute("data-library-audio-index");
    if (!indexValue) return;

    const index = Number(indexValue);
    if (!Number.isInteger(index)) return;

    const selectedTrack = nomusic[index];
    if (!selectedTrack) return;

    start(nomusic, selectedTrack);
  };

  if (isLoading) return <OfflineLibraryAudioSkeleton />;

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_56px] md:gap-4 md:px-4">
          <span>#</span>
          <span>Title</span>
          <span className="hidden md:block">Language</span>
          <span className="text-right">Time</span>
        </div>

        {nomusic.length === 0 ? (
          <OfflineLibraryAudioEmptyBox />
        ) : (
          <div className="space-y-1.5" onClick={handleRowClick}>
            {nomusic.map((track, index) => (
              <OfflineLibraryTrackRow key={track.id} index={index} track={track} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

type TProps = {
  libId: TLibraryOffline["id"];
};
