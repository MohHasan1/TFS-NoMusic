import { RiLoader4Line, RiPauseFill, RiPlayFill, RiSkipBackFill, RiSkipForwardFill } from "@remixicon/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlayerControlsProps = {
  isPlaying: boolean;
  isBuffering?: boolean;
  showPrevious?: boolean;
  size?: "default" | "lg";
  onPrevious: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
};

const PLAY_BUTTON_SIZE = {
  default: "icon-lg",
  lg: "icon-lg",
} as const;

const SKIP_ICON_SIZE = {
  default: "size-5",
  lg: "size-6",
} as const;

export function PlayerControls({
  isPlaying,
  isBuffering = false,
  showPrevious = true,
  size = "default",
  onPrevious,
  onTogglePlay,
  onNext,
}: PlayerControlsProps) {
  const playLabel = isPlaying ? "Pause" : "Play";

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {showPrevious ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          aria-label="Previous track"
          className="rounded-full text-muted-foreground hover:text-foreground"
        >
          <RiSkipBackFill className={cn(SKIP_ICON_SIZE[size])} />
        </Button>
      ) : null}

      <Button
        type="button"
        size={PLAY_BUTTON_SIZE[size]}
        onClick={onTogglePlay}
        aria-label={playLabel}
        aria-pressed={isPlaying}
        className={cn(
          "rounded-full",
          size === "lg" && "size-14 [&_svg:not([class*='size-'])]:size-7",
        )}
      >
        {isBuffering ? (
          <RiLoader4Line className={cn(SKIP_ICON_SIZE[size], "animate-spin")} />
        ) : isPlaying ? (
          <RiPauseFill className={cn(SKIP_ICON_SIZE[size], "fill-current")} />
        ) : (
          <RiPlayFill className={cn(SKIP_ICON_SIZE[size], "translate-x-px fill-current")} />
        )}
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onNext}
        aria-label="Next track"
        className="rounded-full text-muted-foreground hover:text-foreground"
      >
        <RiSkipForwardFill className={cn(SKIP_ICON_SIZE[size])} />
      </Button>
    </div>
  );
}
