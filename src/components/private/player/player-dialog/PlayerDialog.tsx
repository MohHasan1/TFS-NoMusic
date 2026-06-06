"use client";

import { Dialog, DialogContent } from "#components/ui/dialog";
import { usePlayerTrack } from "#modules/player/hooks/usePlayerTrack";
import { usePlayerDialog } from "#modules/player-dialog/hooks/indes";
import { PlayerDialogContent } from "./PlayerDialogContent";
import { PlayerDialogFooter } from "./PlayerDialogFooter";
import { PlayerDialogHeader } from "./PlayerDialogHeader";

export function PlayerDialog() {
  const { track } = usePlayerTrack();
  const { isOpen, setOpen } = usePlayerDialog();

  if (!track) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent showCloseButton={true} className="border border-primary-400/25 bg-card-secondary backdrop-blur-2xl p-0 sm:max-w-130 gap-0 md:gap-6">
        <PlayerDialogHeader />
        <PlayerDialogContent />
        <PlayerDialogFooter />
      </DialogContent>
    </Dialog>
  );
}
