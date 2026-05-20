"use client";

import { useCallback, useRef, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { noMusicEngine } from "@/modules/player/engine";
import { store } from "@/store";
import { formatPlaybackTime } from "../../utils/formatPlaybackTime";

/** Granularity (in seconds) for keyboard / drag seeking. */
const SEEK_STEP_SECONDS = 1;

type PlayerSeekBarProps = {
  showTime?: boolean;
  className?: string;
};

export function PlayerSeekBar({ showTime = true, className }: PlayerSeekBarProps) {
  console.count("PlayerSeekBar render");

  const currentTime = store.use.currentTime();
  const duration = store.use.duration();
  const setTime = store.use.setTime();

  // const currentTime = 0;

  const handleSeek = useCallback(
    (time: number) => {
      noMusicEngine.seek(time);
      setTime(time);
    },
    [setTime],
  );

  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const [scrubbing, setScrubbing] = useState<number | null>(null);
  const hasPendingSeekRef = useRef(false);

  const displayTime = scrubbing ?? currentTime;
  const sliderValue = Math.min(safeDuration, Math.max(0, displayTime));
  const isDisabled = safeDuration <= 0;

  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      {showTime ? <span className="w-10 text-right font-mono text-[10px] tabular-nums text-muted-foreground">{formatPlaybackTime(displayTime)}</span> : null}

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
          handleSeek(next);
        }}
        className="flex-1"
        thumbClassName={cn("opacity-0", "group-hover:opacity-100 group-focus-within:opacity-100 data-[dragging]:opacity-100")}
      />

      {showTime ? <span className="w-10 font-mono text-[10px] tabular-nums text-muted-foreground">{formatPlaybackTime(safeDuration)}</span> : null}
    </div>
  );
}
