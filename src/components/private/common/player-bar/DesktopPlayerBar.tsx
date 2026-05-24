import { Card, CardContent } from "#components/ui/card";

import PlayerArtwork from "./elements/PlayerArtwork";
import { PlayerControls } from "./elements/PlayerControls";
import { PlayerQueueControls } from "./elements/PlayerQueueControls";
import { PlayerSeekBar } from "./elements/PlayerSeekBar";
import PlayerTrackInfo from "./elements/PlayerTrackInfo";

const DesktopPlayerBar = () => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-100 hidden px-2 md:block">
      <Card className="mx-auto w-full max-w-7xl rounded-t-3xl rounded-b-none border border-b-0 bg-card-secondary px-4 py-3 backdrop-blur-xl">
        <CardContent className="flex justify-between items-center gap-10">
          <div className="flex justify-start items-center w-36 min-w-36 lg:w-48 lg:min-w-48">
            <div className="flex justify-center items-center gap-2">
              <PlayerArtwork />
              <PlayerTrackInfo />
            </div>
          </div>

          <div className="min-w-md w-full flex justify-between items-center gap-2 ">
            <PlayerControls />
            <PlayerSeekBar />
            {/* <PlayerQueueControls /> */}
            <PlayerQueueControls />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DesktopPlayerBar;
