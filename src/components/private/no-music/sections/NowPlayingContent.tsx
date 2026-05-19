import { RiLoader4Line, RiPauseFill, RiPlayFill, RiRepeat2Line, RiRepeatOneLine, RiShuffleLine, RiSkipBackFill, RiSkipForwardFill } from "@remixicon/react";
import type { RepeatMode } from "#features/nomusic/queue/engine";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TNoMusic } from "@/types/nomusic";

import { PlayerArtwork } from "../elements/PlayerArtwork";
import { PlayerSeekBar } from "../elements/PlayerSeekBar";
import { PlayerVolume } from "../elements/PlayerVolume";
import { NEXT_REPEAT_LABEL, REPEAT_LABEL } from "../utils/repeatMode";

type NowPlayingContentProps = {
  track: TNoMusic;
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  repeatMode: RepeatMode;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (next: number) => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
};

export function NowPlayingContent({ track, isPlaying, isBuffering, currentTime, duration, volume, shuffle, repeatMode, onTogglePlay, onPrevious, onNext, onSeek, onVolumeChange, onToggleShuffle, onCycleRepeat }: NowPlayingContentProps) {
  return (
    <div className="relative flex flex-col overflow-y-auto">
      <AmbientGlow />

      <div className="relative flex justify-center px-6 pt-6 pb-5 md:pt-8">
        <div className="aspect-square w-full max-w-65">
          <PlayerArtwork imageURL={track.coverImage} size="lg" />
        </div>
      </div>

      <div className="relative flex flex-col gap-5 px-6 pb-7 md:gap-4 md:px-8 md:pb-6">
        <div className="flex flex-col items-center gap-1 text-center">
          <h2 className="max-w-full truncate text-2xl font-bold tracking-tight text-primary">{track.title}</h2>
          <p className="max-w-full truncate text-sm text-muted-foreground md:text-base">{track.artist || "Unknown Artist"}</p>
        </div>

        <PlayerSeekBar currentTime={currentTime} duration={duration} onSeek={onSeek} />

        <ControlsRow isPlaying={isPlaying} isBuffering={isBuffering} shuffle={shuffle} repeatMode={repeatMode} volume={volume} onPrevious={onPrevious} onTogglePlay={onTogglePlay} onNext={onNext} onToggleShuffle={onToggleShuffle} onCycleRepeat={onCycleRepeat} onVolumeChange={onVolumeChange} />
      </div>
    </div>
  );
}

type ControlsRowProps = {
  isPlaying: boolean;
  isBuffering: boolean;
  shuffle: boolean;
  repeatMode: RepeatMode;
  volume: number;
  onPrevious: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
  onVolumeChange: (next: number) => void;
};

function ControlsRow({ isPlaying, isBuffering, shuffle, repeatMode, volume, onPrevious, onTogglePlay, onNext, onToggleShuffle, onCycleRepeat, onVolumeChange }: ControlsRowProps) {
  return (
    <div className="grid grid-cols-3 items-center gap-2">
      <div className="flex items-center gap-1 justify-self-start">
        <ShuffleButton active={shuffle} onClick={onToggleShuffle} />
        <RepeatButton mode={repeatMode} onClick={onCycleRepeat} />
      </div>

      <div className="flex items-center gap-2 justify-self-center md:gap-3">
        <SkipButton direction="prev" onClick={onPrevious} />
        <PlayPauseButton isPlaying={isPlaying} isBuffering={isBuffering} onClick={onTogglePlay} />
        <SkipButton direction="next" onClick={onNext} />
      </div>

      <div className="justify-self-end">
        <PlayerVolume volume={volume} onVolumeChange={onVolumeChange} />
      </div>
    </div>
  );
}

const GLOW = {
  /** Diameter of the violet halo behind the artwork. */
  sizePx: 420,
  /** Blur radius applied to the halo. */
  blurPx: 100,
} as const;

function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden md:h-[76%]">
      <div
        className="-top-24 absolute left-1/2 -translate-x-1/2 rounded-full bg-primary/25 md:-top-24 md:bg-primary/22"
        style={{
          width: GLOW.sizePx,
          height: GLOW.sizePx,
          filter: `blur(${GLOW.blurPx}px)`,
        }}
      />
    </div>
  );
}

function ShuffleButton({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <Button type="button" variant="ghost" size="icon" onClick={onClick} aria-pressed={active} aria-label={active ? "Disable shuffle" : "Enable shuffle"} className={cn("rounded-full text-muted-foreground hover:text-foreground", active && "text-primary hover:text-primary")}>
      <RiShuffleLine className="size-5" />
    </Button>
  );
}

function RepeatButton({ mode, onClick }: { mode: RepeatMode; onClick: () => void }) {
  const Icon = mode === "one" ? RiRepeatOneLine : RiRepeat2Line;
  const isActive = mode !== "off";

  return (
    <Button type="button" variant="ghost" size="icon" onClick={onClick} aria-label={NEXT_REPEAT_LABEL[mode]} title={REPEAT_LABEL[mode]} className={cn("rounded-full text-muted-foreground hover:text-foreground", isActive && "text-primary hover:text-primary")}>
      <Icon className="size-5" />
    </Button>
  );
}

function SkipButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const Icon = direction === "prev" ? RiSkipBackFill : RiSkipForwardFill;
  return (
    <Button type="button" variant="ghost" size="icon" onClick={onClick} aria-label={direction === "prev" ? "Previous track" : "Next track"} className="rounded-full text-foreground hover:text-foreground">
      <Icon className="size-6" />
    </Button>
  );
}

function PlayPauseButton({ isPlaying, isBuffering, onClick }: { isPlaying: boolean; isBuffering: boolean; onClick: () => void }) {
  return (
    <Button type="button" onClick={onClick} aria-label={isPlaying ? "Pause" : "Play"} aria-pressed={isPlaying} className="size-14 rounded-full [&_svg:not([class*='size-'])]:size-7">
      {isBuffering ? <RiLoader4Line className="size-6 animate-spin" /> : isPlaying ? <RiPauseFill className="size-6 fill-current" /> : <RiPlayFill className="size-6 translate-x-px fill-current" />}
    </Button>
  );
}
