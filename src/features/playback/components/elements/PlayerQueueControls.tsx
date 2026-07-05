"use client";

import { NEXT_REPEAT_LABEL, REPEAT_ICON, REPEAT_LABEL } from "./constants";
import { useQueueRepeat } from "#playback-queue/hooks/useQueueRepeat";
import { Button } from "#components/ui/button";
import { cn } from "#lib/utils";

export function PlayerQueueControls({ className }: TProps) {
  const { repeatMode, cycleRepeatMode } = useQueueRepeat();

  const RepeatIcon = REPEAT_ICON[repeatMode];
  const isRepeatActive = repeatMode !== "off";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={cycleRepeatMode}
        aria-label={NEXT_REPEAT_LABEL[repeatMode]}
        title={REPEAT_LABEL[repeatMode]}
        className={cn(
          "rounded-full hover:text-primary-400",
          isRepeatActive ? "text-primary-200" : "text-muted-foreground",
        )}
      >
        <RepeatIcon className="size-4" />
      </Button>
    </div>
  );
}

type TProps = {
  className?: string;
};
