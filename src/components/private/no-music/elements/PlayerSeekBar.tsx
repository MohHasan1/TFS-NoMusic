"use client";

import { useRef, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { formatPlaybackTime } from "../utils/formatPlaybackTime";

/** Granularity (in seconds) for keyboard / drag seeking. */
const SEEK_STEP_SECONDS = 1;

type PlayerSeekBarProps = {
  currentTime: number;
  duration: number;
  showTime?: boolean;
  className?: string;
  onSeek: (time: number) => void;
};

export function PlayerSeekBar({
  currentTime,
  duration,
  showTime = true,
  className,
  onSeek,
}: PlayerSeekBarProps) {
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const [scrubbing, setScrubbing] = useState<number | null>(null);
  const hasPendingSeekRef = useRef(false);

  const displayTime = scrubbing ?? currentTime;
  const sliderValue = Math.min(safeDuration, Math.max(0, displayTime));
  const isDisabled = safeDuration <= 0;

  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      {showTime ? (
        <span className="w-10 text-right font-mono text-[10px] tabular-nums text-muted-foreground">
          {formatPlaybackTime(displayTime)}
        </span>
      ) : null}

      <Slider
        value={sliderValue}
        min={0}
        max={safeDuration || 1}
        step={SEEK_STEP_SECONDS}
        disabled={isDisabled}
        aria-label="Seek"
        onValueChange={(next) => {
          hasPendingSeekRef.current = true;
          setScrubbing(next);
        }}
        onValueCommitted={(next) => {
          if (!hasPendingSeekRef.current) return;

          hasPendingSeekRef.current = false;
          setScrubbing(null);
          onSeek(next);
        }}
        className="flex-1"
        thumbClassName={cn(
          "opacity-0",
          "group-hover:opacity-100 group-focus-within:opacity-100 data-[dragging]:opacity-100",
        )}
      />

      {showTime ? (
        <span className="w-10 font-mono text-[10px] tabular-nums text-muted-foreground">
          {formatPlaybackTime(safeDuration)}
        </span>
      ) : null}
    </div>
  );
}
