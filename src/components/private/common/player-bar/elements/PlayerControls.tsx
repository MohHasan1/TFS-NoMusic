"use client";

import { RiLoader4Line, RiPauseFill, RiPlayFill, RiSkipBackFill, RiSkipForwardFill } from "@remixicon/react";

import { useTrackNavigation } from "#modules/hooks/useTrackNavigation";
import { usePlayerTrackBuffering } from "#modules/player/hooks/usePlayerTrackBuffering";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePlayerPlayback } from "@/modules/player/hooks/usePlayerPlayback";
import { usePlayerTrack } from "@/modules/player/hooks/usePlayerTrack";


export function PlayerControls({ size = "default" }: TProps) {
  const { track } = usePlayerTrack();
  const trackId = track?.id ?? "";

  const { isPlaying, togglePlayback } = usePlayerPlayback(trackId);
  const { isBuffering } = usePlayerTrackBuffering(trackId);



  const { playNext, playPrevious } = useTrackNavigation();

  const playLabel = isPlaying ? "Pause" : "Play";

  return (
    <div className="flex items-center gap-2 lg:gap-4">
      <Button type="button" variant="ghost" size="icon" onClick={playPrevious} aria-label="Previous track" className="rounded-full text-muted-foreground hover:text-foreground">
        <RiSkipBackFill className={cn(SKIP_ICON_SIZE[size])} />
      </Button>

      <Button type="button" size={PLAY_BUTTON_SIZE[size]} onClick={togglePlayback} aria-label={playLabel} aria-pressed={isPlaying} className={cn("rounded-full", size === "lg" && "size-14 [&_svg:not([class*='size-'])]:size-7")}>
        {isBuffering ? <RiLoader4Line className={cn(SKIP_ICON_SIZE[size], "animate-spin")} /> : isPlaying ? <RiPauseFill className={cn(SKIP_ICON_SIZE[size], "fill-current")} /> : <RiPlayFill className={cn(SKIP_ICON_SIZE[size], "translate-x-px fill-current")} />}
      </Button>

      <Button type="button" variant="ghost" size="icon" onClick={playNext} aria-label="Next track" className="rounded-full text-muted-foreground hover:text-foreground">
        <RiSkipForwardFill className={cn(SKIP_ICON_SIZE[size])} />
      </Button>
    </div>
  );
}


type TProps = {
  showPrevious?: boolean;
  size?: "default" | "lg";
};

const PLAY_BUTTON_SIZE = {
  default: "icon-lg",
  lg: "icon-lg",
} as const;

const SKIP_ICON_SIZE = {
  default: "size-5",
  lg: "size-6",
} as const;