"use client";

import { useRef, useState } from "react";

import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { usePlayerSeek } from "@/modules/player/hooks/usePlayerSeek";
import { formatPlaybackTime } from "../../utils/formatPlaybackTime";

const SEEK_STEP_SECONDS = 1;

export function PlayerSeekBar({ showTime = true, className }: TProps) {
  const { currentTime, duration, seekTo } = usePlayerSeek();

  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const [scrubbing, setScrubbing] = useState<number | null>(null);
  const hasPendingSeekRef = useRef(false);

  const displayTime = scrubbing ?? currentTime;
  const sliderValue = Math.min(safeDuration, Math.max(0, displayTime));
  const isDisabled = safeDuration <= 0;

  return (
    <div className={cn("flex max-w-2xl w-full items-center gap-3", className)}>
      {showTime ? <span className="text-right font-mono text-[10px] tabular-nums text-muted-foreground">{formatPlaybackTime(displayTime, "zero")}</span> : null}

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
          seekTo(next);
        }}
        className="flex-1 cursor-pointer"
        thumbClassName={cn("opacity-0", "group-hover:opacity-100 group-focus-within:opacity-100 data-[dragging]:opacity-100")}
      />

      {showTime ? <span className="w-10 font-mono text-[10px] tabular-nums text-muted-foreground">{formatPlaybackTime(safeDuration)}</span> : null}
    </div>
  );
}

type TProps = {
  showTime?: boolean;
  className?: string;
};
