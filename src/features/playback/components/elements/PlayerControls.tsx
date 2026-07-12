"use client";

import {
  RiLoader4Line,
  RiPauseFill,
  RiPlayFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from "@remixicon/react";
import { usePlayerTrackBuffering } from "#playback-player/hooks/usePlayerTrackBuffering";
import { useTrackNavigation } from "#playback/hooks/useTrackNavigation";
import { usePlayerPlayback } from "#playback-player/hooks/usePlayerPlayback";
import { usePlayerTrack } from "#playback-player/hooks/usePlayerTrack";
import { Button } from "#components/ui/button";
import { cn } from "#lib/utils";

export function PlayerControls({ size = "default" }: TProps) {
  const { track } = usePlayerTrack();
  const trackId = track?.id ?? "";

  const { isPlaying, togglePlayback } = usePlayerPlayback(trackId);
  const { isBuffering } = usePlayerTrackBuffering(trackId);

  const { playNext, playPrevious } = useTrackNavigation();

  const playLabel = isPlaying ? `Paused ${track?.name}` : `Playing ${track?.name}` ;

  return (
    <div className="flex items-center gap-2 lg:gap-4">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={playPrevious}
        aria-label="Previous track"
        className="rounded-full text-primary-200 hover:text-foreground"
      >
        <RiSkipBackFill className={cn(ICON_SIZE[size])} />
      </Button>

      <Button
        type="button"
        size={PLAY_BUTTON_SIZE[size]}
        onClick={togglePlayback}
        aria-label={playLabel}
        aria-pressed={isPlaying}
        className={cn("rounded-full p-5", size==="xl" && "p-5 md:p-6")}
      >
        {isBuffering ? (
          <RiLoader4Line className={cn(ICON_SIZE[size], "animate-spin")} />
        ) : isPlaying ? (
          <RiPauseFill className={cn(ICON_SIZE[size], "fill-current")} />
        ) : (
          <RiPlayFill className={cn(ICON_SIZE[size], "translate-x-px fill-current")} />
        )}
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={playNext}
        aria-label="Next track"
        className="rounded-full text-primary-200 hover:text-foreground"
      >
        <RiSkipForwardFill className={cn(ICON_SIZE[size])} />
      </Button>
    </div>
  );
}

type TProps = {
  showPrevious?: boolean;
  size?: "default" | "lg" | "xl";
};

const PLAY_BUTTON_SIZE = {
  default: "icon-lg",
  lg: "icon-lg",
  xl: "icon-lg",
} as const;

const ICON_SIZE = {
  default: "size-4.5",
  lg: "size-5",
  xl:  "size-6",
} as const;
