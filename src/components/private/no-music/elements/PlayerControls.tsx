import {
  RiPauseFill,
  RiSkipBackFill,
  RiSkipForwardFill,
} from "@remixicon/react";

import { Button } from "@/components/ui/button";

type PlayerControlsProps = {
  showPrevious?: boolean;
};

export function PlayerControls({ showPrevious = true }: PlayerControlsProps) {
  return (
    <div className="flex items-center gap-2 md:gap-4">
      {showPrevious ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full text-muted-foreground hover:text-foreground"
        >
          <RiSkipBackFill className="size-5" />
        </Button>
      ) : null}

      <Button type="button" size="icon-lg" className="rounded-full">
        <RiPauseFill className="size-5 fill-current" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-full text-muted-foreground hover:text-foreground"
      >
        <RiSkipForwardFill className="size-5" />
      </Button>
    </div>
  );
}
