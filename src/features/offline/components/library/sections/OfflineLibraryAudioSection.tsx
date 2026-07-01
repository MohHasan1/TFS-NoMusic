"use client";

import { useSearchParams } from "next/navigation";
import type React from "react";

import { useTrackPlayback } from "#modules/hooks/useTrackPlayback";
import { OFFLINE_SOURCE_KEYS } from "#offline/constants/source";
import { useNomusicByLibId } from "#offline/hooks";
import { OfflineLibraryAudioEmptyBox } from "../elements/OfflineLibraryAudioEmptyBox";
import { OfflineLibraryTrackRow } from "../elements/OfflineLibraryTrackRow";

export function OfflineLibraryAudioSection() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { nomusic } = useNomusicByLibId(id ?? undefined);
  const { start } = useTrackPlayback(OFFLINE_SOURCE_KEYS.LIBRARY_PAGE(id ?? "unknown"));
  const tracks = nomusic;

  const handleRowClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    const row = target.closest("[data-library-audio-index]") as HTMLElement | null;
    if (!row) return;

    const indexValue = row.getAttribute("data-library-audio-index");
    if (!indexValue) return;

    const index = Number(indexValue);
    if (!Number.isInteger(index)) return;

    const selectedTrack = tracks[index];
    if (!selectedTrack) return;

    start(tracks, selectedTrack);
  };

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-[22px_minmax(0,1fr)_44px] items-center gap-3 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35 md:grid-cols-[40px_minmax(0,1fr)_minmax(90px,130px)_56px] md:gap-4 md:px-4">
          <span>#</span>
          <span>Title</span>
          <span className="hidden md:block">Language</span>
          <span className="text-right">Time</span>
        </div>

        {tracks.length === 0 ? (
          <OfflineLibraryAudioEmptyBox />
        ) : (
          // biome-ignore lint/a11y/noStaticElementInteractions: Delegated click handling matches the client library browser.
          // biome-ignore lint/a11y/useKeyWithClickEvents: Child buttons handle keyboard activation and bubble the click event here.
          <div className="space-y-1.5" onClick={handleRowClick}>
            {tracks.map((track, index) => (
              <OfflineLibraryTrackRow key={track.id} index={index} track={track} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
