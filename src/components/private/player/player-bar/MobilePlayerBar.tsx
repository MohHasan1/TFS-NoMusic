"use client";

import { usePlayerDialog } from "#modules/player-dialog/hooks/indes";
import { PlayerQueueControls } from "../elements/PlayerQueueControls";
import { PlayerControls } from "../elements/PlayerControls";
import { PlayerSeekBar } from "../elements/PlayerSeekBar";
import PlayerTrackInfo from "./elements/PlayerTrackInfo";
import { Card, CardContent } from "#components/ui/card";
import PlayerArtwork from "./elements/PlayerArtwork";
import { RiArrowUpSLine } from "@remixicon/react";
import PlayerDialogButton from "./elements/PlayerDialogButton";
import { cn } from "@/lib/utils";
import { logInfo } from "#loggers";

const MobilePlayerBar = () => {
  const { isOpen } = usePlayerDialog();

    logInfo("MobilePlayerBar")
  
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.15rem)] z-100 px-2 md:hidden transition-all duration-700 ease-in-out",
        isOpen ? "translate-y-full" : "-translate-y-8",
      )}
    >
      <Card className="mx-auto w-full max-w-3xl rounded-3xl border bg-card-secondary p-3 backdrop-blur-xl">
        <CardContent className="flex flex-col gap-4 px-0 items-center">
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <PlayerArtwork />
              <PlayerTrackInfo />
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <PlayerControls />
              <PlayerQueueControls />
            </div>
          </div>

          <div className="flex justify-between items-center w-full">
           {!isOpen ? <PlayerSeekBar className="w-full" /> : <div className="max-w-2xl w-full" />}

            <PlayerDialogButton className="p-1">
              <RiArrowUpSLine className="size-4" />
            </PlayerDialogButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobilePlayerBar;
