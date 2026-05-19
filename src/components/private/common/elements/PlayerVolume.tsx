"use client";

import { RiVolumeDownLine, RiVolumeMuteLine, RiVolumeUpLine } from "@remixicon/react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverPopup, PopoverPortal, PopoverPositioner, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type PlayerVolumeProps = {
  volume: number;
  className?: string;
  onVolumeChange: (next: number) => void;
};

/** Slider value range. UI uses 0..100, store uses 0..1. */
const SLIDER_MAX = 100;
/** Granularity (in slider units) for keyboard / drag. */
const VOLUME_STEP = 1;
/** Hover-to-open delay; matches Base UI default but stated explicitly for intent. */
const HOVER_OPEN_DELAY_MS = 150;
/** Brief close delay so the slider stays open while moving the cursor between trigger and popup. */
const HOVER_CLOSE_DELAY_MS = 200;

export function PlayerVolume({ volume, className, onVolumeChange }: PlayerVolumeProps) {
  const previousVolumeRef = useRef(volume > 0 ? volume : 1);

  const isMuted = volume === 0;
  const Icon = isMuted ? RiVolumeMuteLine : volume < 0.5 ? RiVolumeDownLine : RiVolumeUpLine;

  // Alt-click or middle-click toggles mute without opening the slider.
  const handleAuxClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!event.altKey && event.button !== 1) return;
    event.preventDefault();

    if (isMuted) {
      onVolumeChange(previousVolumeRef.current || 1);
      return;
    }
    previousVolumeRef.current = volume;
    onVolumeChange(0);
  };

  return (
    <Popover>
      <PopoverTrigger
        openOnHover
        delay={HOVER_OPEN_DELAY_MS}
        closeDelay={HOVER_CLOSE_DELAY_MS}
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onAuxClick={handleAuxClick}
            aria-label="Volume"
            className={cn(
              "rounded-full text-muted-foreground hover:text-foreground",
              className,
            )}
          >
            <Icon className="size-5" />
          </Button>
        }
      />
      <PopoverPortal>
        <PopoverPositioner side="top" align="center">
          <PopoverPopup className="flex h-36 items-center justify-center">
            <Slider
              orientation="vertical"
              value={Math.round(volume * SLIDER_MAX)}
              min={0}
              max={SLIDER_MAX}
              step={VOLUME_STEP}
            aria-label="Volume"
            onValueChange={(next) => onVolumeChange(next / SLIDER_MAX)}
            className="h-full"
          />
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverPortal>
    </Popover>
  );
}
