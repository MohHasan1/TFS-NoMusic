"use client";

import type React from "react";

import { SOURCE_KEYS } from "#constants/private/source";
import { useTrackPlayback } from "#playback/hooks/useTrackPlayback";
import type { TNoMusic } from "#types/nomusic";

import { LibraryTrackRow } from "./LibraryTrackRow";

export function LibraryAudioBrowser({ libId, tracks }: TProps) {
  const { start } = useTrackPlayback(SOURCE_KEYS.LIBRARY_PAGE(libId));

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
    <div className="space-y-1.5" onClick={handleRowClick}>
      {tracks.map((track, index) => (
        <LibraryTrackRow key={track.id} index={index} track={track} />
      ))}
    </div>
  );
}

type TProps = {
  libId: string;
  tracks: TNoMusic[];
};
