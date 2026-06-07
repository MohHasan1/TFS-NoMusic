"use client";

import { Dialog, DialogContent } from "#components/ui/dialog";
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

  if (!track) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true} className="border border-primary-400/25 bg-card-secondary backdrop-blur-xl p-0 sm:max-w-130 gap-0 md:gap-6">
        <NewPlayerDialogHeader />
        <NewPlayerDialogContent />
        <NewPlayerDialogFooter />
      </DialogContent>
    </Dialog>
  );
}
