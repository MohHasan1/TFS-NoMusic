"use client";

import { PlayerControls } from "#components/private/player/elements/PlayerControls";
import { PlayerQueueControls } from "#components/private/player/elements/PlayerQueueControls";
import { PlayerSeekBar } from "#components/private/player/elements/PlayerSeekBar";
import { usePlayerTrack } from "#modules/player/hooks/usePlayerTrack";

export function NewPlayerDialogFooter() {
  const { track } = usePlayerTrack();

  if (!track) return null;

  return (
    <>
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-between px-6 text-center md:px-8">
          <div className="max-w-xs truncate text-2xl font-semibold text-primary-400">{track.name ?? "Untitled Nomusic"}</div>
          <div className="max-w-sm truncate text-sm text-muted-foreground md:text-base">{track.artist ?? "Unknown Artist"}</div>
        </div>

        <div className="w-full px-6 pt-5 md:px-8 md:pt-4">
          <PlayerSeekBar />
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-2 px-6 pt-4 pb-8">
        <div className="flex items-center gap-1 justify-self-start" />

        <div className="justify-self-center">
          <PlayerControls size="lg" />
        </div>

        <div className="flex items-center gap-1 justify-self-end">
          <PlayerQueueControls />
        </div>
      </div>
    </>
  );
}
