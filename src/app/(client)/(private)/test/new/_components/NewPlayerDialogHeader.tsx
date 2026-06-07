"use client";

import { DialogDescription, DialogHeader, DialogTitle } from "#components/ui/dialog";
import { usePlayerTrack } from "#modules/player/hooks/usePlayerTrack";

export function NewPlayerDialogHeader() {
  const { trackSource } = usePlayerTrack();

  return (
    <DialogHeader className="flex flex-col items-center gap-1 p-4 text-center md:p-6">
      <DialogTitle className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Playing from</DialogTitle>
      <DialogDescription className="max-w-[60vw] truncate text-sm font-semibold text-primary-200 md:max-w-xs">{trackSource}</DialogDescription>
    </DialogHeader>
  );
}
