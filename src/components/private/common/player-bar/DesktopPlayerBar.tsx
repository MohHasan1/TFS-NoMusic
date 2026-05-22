import { RiArrowUpSLine } from "@remixicon/react";
import { Button } from "#components/ui/button";
import { Card } from "#components/ui/card";
import { useNowPlaying } from "@/modules/nowPlaying/hook.nowPlaying";
import PlayerArtwork from "./elements/PlayerArtwork";
import { PlayerControls } from "./elements/PlayerControls";
import { PlayerQueueControls } from "./elements/PlayerQueueControls";
import { PlayerSeekBar } from "./elements/PlayerSeekBar";

// import { PlayerVolume } from "./elements/PlayerVolume";
import PlayerTrackInfo from "./elements/PlayerTrackInfo";


const DesktopPlayerBar = () => {
  // const { open: openNowPlaying } = useNowPlaying();

  return (
    <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-50 hidden px-4 md:block">
      <Card
        // onClick={openNowPlaying}
        className="bg-card-secondary pointer-events-auto mx-auto w-full max-w-7xl cursor-pointer rounded-t-3xl rounded-b-none border border-b-0 px-4 py-3 shadow-2xl backdrop-blur-md"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(360px,760px)_minmax(0,1fr)] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(460px,760px)_minmax(0,1fr)]">
          <div className="flex min-w-0 items-center gap-3">
            <PlayerArtwork />
            <PlayerTrackInfo />
          </div>

          <div className="flex w-full items-center gap-3">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation only */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: stopPropagation only */}
            <div className="shrink-0" onClick={(event) => event.stopPropagation()}>
              <PlayerControls />
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation only */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: stopPropagation only */}
            <div className="min-w-0 flex-1">
              <PlayerSeekBar />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation only */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: stopPropagation only */}
            <div onClick={(event) => event.stopPropagation()}>
              <PlayerQueueControls />
            </div>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation only */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: stopPropagation only */}
            {/* <div onClick={(event) => event.stopPropagation()}>
              <PlayerVolume />
            </div> */}
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation only */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: stopPropagation only */}
            <div onClick={(event) => event.stopPropagation()}>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                // onClick={openNowPlaying}
                aria-label="Open now playing view"
                className="rounded-full text-muted-foreground hover:text-foreground"
              >
                <RiArrowUpSLine className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DesktopPlayerBar;
