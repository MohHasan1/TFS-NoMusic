"use client";

import { RiArrowUpSLine } from "@remixicon/react";
import { Card, CardContent } from "#components/ui/card";
import { cn } from "#lib/utils";
import { usePlayerDialog } from "#playback-dialog/hooks/indes";
import { PlayerControls } from "../elements/PlayerControls";
import { PlayerQueueControls } from "../elements/PlayerQueueControls";
import { PlayerSeekBar } from "../elements/PlayerSeekBar";
import PlayerArtwork from "./elements/PlayerArtwork";
import PlayerDialogButton from "./elements/PlayerDialogButton";
import PlayerTrackInfo from "./elements/PlayerTrackInfo";

const DesktopPlayerBar = () => {
  const { isOpen } = usePlayerDialog();

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-100 hidden px-2 transition-transform duration-700 ease-in-out md:block",
        isOpen ? "translate-y-full" : "translate-y-0",
      )}
    >
      <Card className="mx-auto w-full max-w-7xl rounded-t-3xl rounded-b-none border border-b-0 bg-card-secondary px-4 py-3 backdrop-blur-xl">
        <CardContent className="flex justify-between items-center gap-10">
          <div className="flex justify-start items-center w-36 min-w-36 lg:w-48 lg:min-w-48">
            <div className="flex justify-center items-center gap-2">
              <PlayerArtwork />
              <PlayerTrackInfo />
            </div>
          </div>

          <div className="min-w-md w-full flex justify-between items-center gap-2 ">
            <PlayerControls size="lg" />

            <PlayerQueueControls />
            {!isOpen ? <PlayerSeekBar /> : <div className="max-w-2xl w-full h-1 bg-muted" />}

            <PlayerDialogButton className="p-2 text-primary-200 rounded-full">
              <RiArrowUpSLine className="size-5" />
            </PlayerDialogButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesktopPlayerBar;
