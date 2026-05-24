"use client";

import { Card, CardContent } from "#components/ui/card";

import PlayerArtwork from "./elements/PlayerArtwork";
import { PlayerControls } from "./elements/PlayerControls";
import { PlayerQueueControls } from "./elements/PlayerQueueControls";
import { PlayerSeekBar } from "./elements/PlayerSeekBar";
import PlayerTrackInfo from "./elements/PlayerTrackInfo";

const MobilePlayerBar = () => {
  return (
    <div className="fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] z-100 px-3 md:hidden">
      <Card className="mx-auto w-full max-w-xl rounded-3xl border bg-card-secondary/95 px-3 py-3 shadow-2xl backdrop-blur-md">
        <CardContent className="space-y-3 px-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <PlayerArtwork />
              <PlayerTrackInfo />
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {/* <PlayerQueueControls /> */}
              <PlayerControls />
              <PlayerQueueControls />
            </div>
          </div>

          <PlayerSeekBar showTime={false} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MobilePlayerBar;
