"use client";

import { DialogDescription, DialogHeader, DialogTitle } from "#components/ui/dialog";
import { usePlayerTrack } from "#playback-player/hooks/usePlayerTrack";

export function PlayerDialogHeader() {
  const { trackSourceLabel } = usePlayerTrack();

  return (
    <DialogHeader className="flex flex-col items-center gap-1 text-center p-4 md:p-6">
      <DialogTitle
        className={"text-xs font-semibold uppercase tracking-wide text-muted-foreground"}
      >
        Playing from
      </DialogTitle>
      <DialogDescription className="text-sm font-semibold text-primary-200 max-w-[60vw] md:max-w-xs truncate">
        {trackSourceLabel}
      </DialogDescription>
    </DialogHeader>
  );
}
