"use client";

import { Card } from "@/components/ui/card";
import { PlayerArtwork } from "@/components/private/no-music/elements/PlayerArtwork";
import { PlayerControls } from "@/components/private/no-music/elements/PlayerControls";
import { PlayerProgress } from "@/components/private/no-music/elements/PlayerProgress";

const previewNoMusic = {
  title: "Midnight Vocals",
  artist: "No Music Library",
};

const previewProgress = {
  currentTime: "1:24",
  duration: "3:48",
  progress: 37,
};

function DesktopNoMusicPlayer() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-60 hidden md:block">
      <Card className="rounded-none border-x-0 border-b-0 bg-card/95 px-4 py-3 shadow-2xl backdrop-blur-2xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_minmax(320px,520px)_minmax(0,1fr)] items-center gap-6">
          <div className="flex min-w-0 items-center gap-3">
            <PlayerArtwork isPlaying />
            <div className="min-w-0">
              <h4 className="truncate text-sm font-bold text-card-foreground">
                {previewNoMusic.title}
              </h4>
              <p className="truncate text-xs text-muted-foreground">
                {previewNoMusic.artist}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-2">
            <PlayerControls />
            <PlayerProgress
              currentTime={previewProgress.currentTime}
              duration={previewProgress.duration}
              progress={previewProgress.progress}
            />
          </div>
          <div />
        </div>
      </Card>
    </div>
  );
}

function MobileNoMusicPlayer() {
  return (
    <div className="fixed right-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-0 z-60 px-4 md:hidden">
      <div className="mx-auto max-w-xl">
        <Card className="space-y-3.5 rounded-[1.75rem] bg-card/95 p-3 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <PlayerArtwork isPlaying />

              <div className="min-w-0">
                <h4 className="truncate pr-2 text-xs font-bold text-card-foreground">
                  {previewNoMusic.title}
                </h4>
                <p className="truncate text-[10px] text-muted-foreground">
                  {previewNoMusic.artist}
                </p>
              </div>
            </div>

            <PlayerControls showPrevious={false} />
          </div>

          <PlayerProgress
            progress={previewProgress.progress}
            showTime={false}
          />
        </Card>
      </div>
    </div>
  );
}

export function NoMusicPlayer() {
  return (
    <>
      <DesktopNoMusicPlayer />
      <MobileNoMusicPlayer />
    </>
  );
}
