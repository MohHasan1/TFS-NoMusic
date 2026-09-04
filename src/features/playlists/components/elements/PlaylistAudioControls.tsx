"use client";

import { RiPlayFill, RiShuffleLine } from "@remixicon/react";

import { Button } from "#components/ui/button";
import { SOURCE_KEYS } from "#constants/private/source";
import { useTrackPlayback } from "#playback/hooks/useTrackPlayback";
import { useQueueRepeat } from "#playback-queue/hooks/useQueueRepeat";
import type { TNoMusic } from "#types/nomusic";

export function PlaylistAudioControls({ playlistId, tracks }: TProps) {
  const { start } = useTrackPlayback(SOURCE_KEYS.PLAYLIST_PAGE(playlistId));
  const { setRepeatMode } = useQueueRepeat();

  const isEmpty = tracks.length === 0;

  function playAll() {
    const first = tracks[0];
    if (!first) return;
    setRepeatMode("all");
    start(tracks, first, true);
  }

  function shufflePlay() {
    if (isEmpty) return;
    const startTrack = tracks[Math.floor(Math.random() * tracks.length)];
    setRepeatMode("random");
    start(tracks, startTrack, true);
  }

  return (
    <div className="flex items-center gap-2">
      <Button type="button" size="sm" disabled={isEmpty} onClick={playAll}>
        <RiPlayFill data-icon="inline-start" />
        Play all
      </Button>

      <Button type="button" size="icon-sm" variant="outline" disabled={isEmpty} onClick={shufflePlay} aria-label="Shuffle play" title="Shuffle play">
        <RiShuffleLine />
      </Button>
    </div>
  );
}

type TProps = {
  playlistId: string;
  tracks: TNoMusic[];
};
