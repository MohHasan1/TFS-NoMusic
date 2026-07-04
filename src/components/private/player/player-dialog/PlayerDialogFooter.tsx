"use client";

import { usePlayerDialog } from "#playback-dialog/hooks/indes";
import { usePlayerTrack } from "#playback-player/hooks/usePlayerTrack";

import { PlayerQueueControls } from "../elements/PlayerQueueControls";
import { PlayerControls } from "../elements/PlayerControls";
import { PlayerSeekBar } from "../elements/PlayerSeekBar";

export function PlayerDialogFooter() {
  const { isOpen } = usePlayerDialog();
  const { track } = usePlayerTrack();

  if (!track) return null;

  return (
    <>
      <div className="flex flex-col justify-between items-center">
        <div className="flex flex-col justify-between items-center text-center px-6 md:px-8">
          <div className="max-w-xs truncate text-2xl font-semibold text-primary-400">
            {track.name ?? "Untitled Nomusic"}
          </div>
          <div className="max-w-sm truncate text-sm md:text-base text-muted-foreground">
            {track.artist ?? "Unknown Artist"}
          </div>
        </div>

        <div className="w-full px-6 pt-5 md:px-8 md:pt-4">{isOpen && <PlayerSeekBar />}</div>
      </div>

      <div className="grid grid-cols-3 items-center gap-2 px-6 pt-4 pb-8">
        <div className="flex items-center gap-1 justify-self-start">
          {/* <PlayerQueueControls /> */}
        </div>

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
