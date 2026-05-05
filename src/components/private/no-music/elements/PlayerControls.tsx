import {
  RiPlayFill,
  RiPauseFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";

type PlayerControlsProps = {
  showPrevious?: boolean;
  isPlaying: boolean;
  onPrevious: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
};

export function PlayerControls({
  showPrevious = true,
  isPlaying,
  onPrevious,
  onTogglePlay,
  onNext,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      {showPrevious ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="rounded-full text-muted-foreground hover:text-foreground"
        >
          <RiSkipBackFill className="size-5" />
        </Button>
      ) : null}

      <Button
        type="button"
        size="icon-lg"
        onClick={onTogglePlay}
        className="rounded-full"
      >
        {isPlaying ? (
          <RiPauseFill className="size-5 fill-current" />
        ) : (
          <RiPlayFill className="size-5 fill-current" />
        )}
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="rounded-full text-muted-foreground hover:text-foreground"
      >
        <RiSkipForwardFill className="size-5" />
      </Button>
    </div>
  );
}
