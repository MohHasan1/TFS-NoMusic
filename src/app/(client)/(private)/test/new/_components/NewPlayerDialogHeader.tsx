"use client";

import { RiCloseLine } from "@remixicon/react";
import { usePlayerTrack } from "#modules/player/hooks/usePlayerTrack";

type NewPlayerDialogHeaderProps = {
  onClose: () => void;
};

export function NewPlayerDialogHeader({ onClose }: NewPlayerDialogHeaderProps) {
  const { trackSource } = usePlayerTrack();

  return (
    <div className="relative flex flex-col items-center gap-1 p-4 text-center md:p-6">
      <button type="button" aria-label="Close dialog" onClick={onClose} className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
        <RiCloseLine className="size-4" />
      </button>

      <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Playing from</div>
      <div className="max-w-[60vw] truncate text-sm font-semibold text-primary-200 md:max-w-xs">{trackSource}</div>
    </div>
  );
}
