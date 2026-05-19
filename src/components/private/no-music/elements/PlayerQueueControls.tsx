import { RiRepeat2Line, RiRepeatOneLine, RiShuffleLine } from "@remixicon/react";
import type { RepeatMode } from "#features/nomusic/queue/engine";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NEXT_REPEAT_LABEL, REPEAT_LABEL } from "../utils/repeatMode";

type PlayerQueueControlsProps = {
  shuffle: boolean;
  repeatMode: RepeatMode;
  className?: string;
  onToggleShuffle: () => void;
  onCycleRepeat: () => void;
};

export function PlayerQueueControls({ shuffle, repeatMode, className, onToggleShuffle, onCycleRepeat }: PlayerQueueControlsProps) {
  const RepeatIcon = repeatMode === "one" ? RiRepeatOneLine : RiRepeat2Line;
  const isRepeatActive = repeatMode !== "off";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button type="button" variant="ghost" size="icon" onClick={onToggleShuffle} aria-pressed={shuffle} aria-label={shuffle ? "Disable shuffle" : "Enable shuffle"} className={cn("rounded-full text-muted-foreground hover:text-foreground", shuffle && "text-primary hover:text-primary")}>
        <RiShuffleLine className="size-4" />
      </Button>

      <Button type="button" variant="ghost" size="icon" onClick={onCycleRepeat} aria-label={NEXT_REPEAT_LABEL[repeatMode]} title={REPEAT_LABEL[repeatMode]} className={cn("rounded-full text-muted-foreground hover:text-foreground", isRepeatActive && "text-primary hover:text-primary")}>
        <RepeatIcon className="size-4" />
      </Button>
    </div>
  );
}
