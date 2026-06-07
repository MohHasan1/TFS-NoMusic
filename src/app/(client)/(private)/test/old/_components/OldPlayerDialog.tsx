"use client";

import { PlayerDialogContent } from "#components/private/player/player-dialog/PlayerDialogContent";
import { PlayerDialogFooter } from "#components/private/player/player-dialog/PlayerDialogFooter";
import { PlayerDialogHeader } from "#components/private/player/player-dialog/PlayerDialogHeader";
import { Dialog, DialogContent } from "#components/ui/dialog";
import { usePlayerTrack } from "#modules/player/hooks/usePlayerTrack";

type OldPlayerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OldPlayerDialog({ open, onOpenChange }: OldPlayerDialogProps) {
  const { track } = usePlayerTrack();

  if (!track) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={true} className="border border-primary-400/25 bg-card-secondary backdrop-blur-xl p-0 sm:max-w-130 gap-0 md:gap-6">
        <PlayerDialogHeader />
        <PlayerDialogContent />
        <PlayerDialogFooter />
      </DialogContent>
    </Dialog>
  );
}
