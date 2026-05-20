"use client";

import { RiRepeat2Line, RiRepeatOneLine, RiShuffleLine } from "@remixicon/react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { store } from "@/store";
import { NEXT_REPEAT_LABEL, nextRepeatMode, REPEAT_LABEL } from "../../utils/repeatMode";

type PlayerQueueControlsProps = {
  className?: string;
};

export function PlayerQueueControls({ className }: PlayerQueueControlsProps) {
  const shuffle = store.use.shuffle();
  const repeatMode = store.use.repeatMode();

  const setShuffle = store.use.setShuffle();
  const setRepeatMode = store.use.setRepeatMode();

  const handleToggleShuffle = useCallback(() => {
    setShuffle(!shuffle);
  }, [shuffle, setShuffle]);

  const handleCycleRepeat = useCallback(() => {
    setRepeatMode(nextRepeatMode(repeatMode));
  }, [repeatMode, setRepeatMode]);

  const RepeatIcon = repeatMode === "one" ? RiRepeatOneLine : RiRepeat2Line;
  const isRepeatActive = repeatMode !== "off";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button type="button" variant="ghost" size="icon" onClick={handleToggleShuffle} aria-pressed={shuffle} aria-label={shuffle ? "Disable shuffle" : "Enable shuffle"} className={cn("rounded-full text-muted-foreground hover:text-foreground", shuffle && "text-primary hover:text-primary")}>
        <RiShuffleLine className="size-4" />
      </Button>

      <Button type="button" variant="ghost" size="icon" onClick={handleCycleRepeat} aria-label={NEXT_REPEAT_LABEL[repeatMode]} title={REPEAT_LABEL[repeatMode]} className={cn("rounded-full text-muted-foreground hover:text-foreground", isRepeatActive && "text-primary hover:text-primary")}>
        <RepeatIcon className="size-4" />
      </Button>
    </div>
  );
}
