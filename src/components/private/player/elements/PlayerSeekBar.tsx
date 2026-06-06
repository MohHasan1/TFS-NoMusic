"use client";

import { useEffect, useRef, useState } from "react";
import { formatPlaybackTime } from "#components/private/_utils/helpers";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { usePlayerSeek } from "@/modules/player/hooks/usePlayerSeek";

const SEEK_STEP_SECONDS = 1;
const SEEK_SYNC_THRESHOLD_SECONDS = 0.25;

export function PlayerSeekBar({ showTime = true, className }: TProps) {
  const { currentTime, duration, seekTo } = usePlayerSeek();

  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const [scrubbing, setScrubbing] = useState<number | null>(null);
  const hasPendingSeekRef = useRef(false);
  const scrubFrameRef = useRef<number | null>(null);
  const pendingScrubValueRef = useRef<number | null>(null);

  const displayTime = scrubbing ?? currentTime;
  const sliderValue = Math.min(safeDuration, Math.max(0, displayTime));
  const isDisabled = safeDuration <= 0;

  useEffect(() => {
    if (scrubbing === null) return;
    if (Math.abs(currentTime - scrubbing) > SEEK_SYNC_THRESHOLD_SECONDS) return;

    setScrubbing(null);
  }, [currentTime, scrubbing]);

  useEffect(() => {
    return () => {
      if (scrubFrameRef.current === null) return;
      cancelAnimationFrame(scrubFrameRef.current);
    };
  }, []);

  return (
    <div className={cn("flex max-w-2xl w-full items-center gap-3", className)}>
      {showTime ? (
        <span className="text-right font-mono text-[10px] tabular-nums text-muted-foreground">
          {formatPlaybackTime(displayTime, "zero")}
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
          pendingScrubValueRef.current = next;

          if (scrubFrameRef.current !== null) return;

          scrubFrameRef.current = requestAnimationFrame(() => {
            scrubFrameRef.current = null;
            setScrubbing(pendingScrubValueRef.current);
          });
        }}
        onValueCommitted={(next) => {
          if (!hasPendingSeekRef.current) return;

          hasPendingSeekRef.current = false;
          pendingScrubValueRef.current = next;

          if (scrubFrameRef.current !== null) {
            cancelAnimationFrame(scrubFrameRef.current);
            scrubFrameRef.current = null;
          }

          seekTo(next);
          setScrubbing(next);
        }}
        trackClassName="bg-primary-400/10"
        className="flex-1 cursor-pointer"
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

type TProps = {
  showTime?: boolean;
  className?: string;
};
