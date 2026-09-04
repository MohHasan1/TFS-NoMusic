"use client";

import type React from "react";

import { SOURCE_KEYS } from "#constants/private/source";
import { useTrackPlayback } from "#playback/hooks/useTrackPlayback";
import type { TNoMusic } from "#types/nomusic";

import { PlaylistTrackRow } from "./PlaylistTrackRow";

export function PlaylistAudioBrowser({ playlistId, tracks }: TProps) {
  const { start } = useTrackPlayback(SOURCE_KEYS.PLAYLIST_PAGE(playlistId));

  const handleRowClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;

    const row = target.closest("[data-playlist-audio-index]") as HTMLElement | null;
    if (!row) return;

    const indexValue = row.getAttribute("data-playlist-audio-index");
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
        <PlaylistTrackRow key={track.id} index={index} track={track} />
      ))}
    </div>
  );
}

type TProps = {
  playlistId: string;
  tracks: TNoMusic[];
};
