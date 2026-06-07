"use client";

import { useEffect } from "react";
import { usePlayerTrack } from "#modules/player/hooks/usePlayerTrack";
import { NewPlayerDialogContent } from "./NewPlayerDialogContent";
import { NewPlayerDialogFooter } from "./NewPlayerDialogFooter";
import { NewPlayerDialogHeader } from "./NewPlayerDialogHeader";

type NewPlayerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NewPlayerDialog({ open, onOpenChange }: NewPlayerDialogProps) {
  const { track } = usePlayerTrack();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  if (!track) return null;
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" aria-label="Close dialog" className="absolute inset-0 bg-black/80 backdrop-blur-xs" onClick={() => onOpenChange(false)} />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div role="dialog" aria-modal="true" aria-label={track.name ?? "Now playing"} className="relative grid w-full max-w-[calc(100%-2rem)] gap-0 rounded-4xl border border-primary-400/25 bg-card-secondary p-0 text-sm text-popover-foreground shadow-2xl outline-none sm:max-w-130 md:gap-6">
          <NewPlayerDialogHeader onClose={() => onOpenChange(false)} />
          {/* <NewPlayerDialogContent /> */}
          <NewPlayerDialogFooter />
        </div>
      </div>
    </div>
  );
}
