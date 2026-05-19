"use client";

import { RiArrowUpSLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useNoMusicPlaybackController } from "@/modules/hooks/hook.noMusicPlaybackController";
import { useNowPlaying } from "@/modules/nowPlaying/hook.nowPlaying";
import { useNoMusicQueue } from "@/modules/queue/hook";
import { PlayerArtwork } from "../elements/PlayerArtwork";
import { PlayerControls } from "../elements/PlayerControls";
import { PlayerQueueControls } from "../elements/PlayerQueueControls";
import { PlayerSeekBar } from "../elements/PlayerSeekBar";
import { PlayerTrackInfo } from "../elements/PlayerTrackInfo";
import { PlayerVolume } from "../elements/PlayerVolume";
import { nextRepeatMode } from "../utils/repeatMode";

export function NoMusicPlayer() {
  const { currentTrack, isPlaying, isBuffering, currentTime, duration, volume, togglePlayback, seek, setVolume, playNextTrack, playPrevTrack } = useNoMusicPlaybackController();
  const { shuffle, repeatMode, setShuffle, setRepeatMode } = useNoMusicQueue();
  const { open: openNowPlaying } = useNowPlaying();

  if (!currentTrack) return null;

  const handleExpand = () => openNowPlaying();

  return (
    <>
      <DesktopPlayerBar
        isPlaying={isPlaying}
        isBuffering={isBuffering}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        shuffle={shuffle}
        repeatMode={repeatMode}
        track={currentTrack}
        onTogglePlay={togglePlayback}
        onPrevious={playPrevTrack}
        onNext={playNextTrack}
        onSeek={seek}
        onVolume={setVolume}
        onToggleShuffle={() => setShuffle(!shuffle)}
        onCycleRepeat={() => setRepeatMode(nextRepeatMode(repeatMode))}
        onExpand={handleExpand}
      />

      <MobilePlayerBar isPlaying={isPlaying} isBuffering={isBuffering} currentTime={currentTime} duration={duration} track={currentTrack} onTogglePlay={togglePlayback} onPrevious={playPrevTrack} onNext={playNextTrack} onSeek={seek} onExpand={handleExpand} />
    </>
  );
}

type DesktopBarProps = {
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeatMode: ReturnType<typeof useNoMusicQueue>["repeatMode"];
  track: NonNullable<ReturnType<typeof useNoMusicPlaybackController>["currentTrack"]>;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onVolume: (next: number) => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
  onExpand: () => void;
};

function DesktopPlayerBar({ isPlaying, isBuffering, currentTime, duration, volume, shuffle, repeatMode, track, onTogglePlay, onPrevious, onNext, onSeek, onVolume, onToggleShuffle, onCycleRepeat, onExpand }: DesktopBarProps) {
  return (
    <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-50 hidden px-4 md:block">
      <Card onClick={onExpand} className="bg-card-secondary pointer-events-auto mx-auto w-full max-w-7xl cursor-pointer rounded-t-3xl rounded-b-none border border-b-0 px-4 py-3 shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(360px,760px)_minmax(0,1fr)] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(460px,760px)_minmax(0,1fr)]">
          <ExpandTarget onExpand={onExpand} className="flex min-w-0 items-center gap-3">
            <PlayerArtwork imageURL={track.coverImage} isPlaying={isPlaying} size="sm" />
            <PlayerTrackInfo track={track} size="sm" />
          </ExpandTarget>

          <div className="flex w-full items-center gap-3">
            <div className="shrink-0" onClick={(event) => event.stopPropagation()}>
              <PlayerControls isPlaying={isPlaying} isBuffering={isBuffering} onPrevious={onPrevious} onTogglePlay={onTogglePlay} onNext={onNext} />
            </div>
            <div className="min-w-0 flex-1" onClick={(event) => event.stopPropagation()}>
              <PlayerSeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <div onClick={(event) => event.stopPropagation()}>
              <PlayerQueueControls shuffle={shuffle} repeatMode={repeatMode} onToggleShuffle={onToggleShuffle} onCycleRepeat={onCycleRepeat} />
            </div>
            <div onClick={(event) => event.stopPropagation()}>
              <PlayerVolume volume={volume} onVolumeChange={onVolume} />
            </div>
            <div onClick={(event) => event.stopPropagation()}>
              <Button type="button" variant="ghost" size="icon" onClick={onExpand} aria-label="Open now playing view" className="rounded-full text-muted-foreground hover:text-foreground">
                <RiArrowUpSLine className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

type MobileBarProps = {
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  track: NonNullable<ReturnType<typeof useNoMusicPlaybackController>["currentTrack"]>;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onExpand: () => void;
};

function MobilePlayerBar({ isPlaying, isBuffering, currentTime, duration, track, onTogglePlay, onPrevious, onNext, onSeek, onExpand }: MobileBarProps) {
  return (
    <div className="fixed right-0 bottom-[calc(env(safe-area-inset-bottom)+0.75rem)] left-0 z-50 px-4 md:hidden">
      <div className="mx-auto max-w-xl">
        <Card className="space-y-3 rounded-3xl bg-card/95 p-3 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <ExpandTarget onExpand={onExpand} className="flex min-w-0 flex-1 items-center gap-3">
              <PlayerArtwork imageURL={track.coverImage} isPlaying={isPlaying} size="sm" />
              <PlayerTrackInfo track={track} size="sm" />
            </ExpandTarget>

            <PlayerControls isPlaying={isPlaying} isBuffering={isBuffering} onPrevious={onPrevious} onTogglePlay={onTogglePlay} onNext={onNext} />
          </div>

          <PlayerSeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />
        </Card>
      </div>
    </div>
  );
}

type ExpandTargetProps = {
  className?: string;
  children: React.ReactNode;
  onExpand: () => void;
};

function ExpandTarget({ className, children, onExpand }: ExpandTargetProps) {
  return (
    <button type="button" onClick={onExpand} aria-label="Open now playing view" className={cn("min-w-0 cursor-pointer rounded-xl text-left outline-none transition-colors", "focus-visible:ring-2 focus-visible:ring-ring/50", className)}>
      {children}
    </button>
  );
}
