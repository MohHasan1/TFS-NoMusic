"use client";

import type React from "react";

import type { TNoMusic } from "#types/nomusic";

import { PlaylistTrackRow } from "./PlaylistTrackRow";

export function PlaylistAudioBrowser({ playlistId, tracks }: TProps) {
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

    // TODO: wire playback — start(tracks, selectedTrack) with a playlist source key.
  };

  return (
    <div className="space-y-1.5" data-playlist-id={playlistId} onClick={handleRowClick}>
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
