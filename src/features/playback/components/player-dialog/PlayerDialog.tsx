"use client";

import { usePlayerTrack } from "#playback-player/hooks/usePlayerTrack";
import { usePlayerDialog } from "#playback-dialog/hooks/indes";
import { Dialog, DialogContent } from "#components/ui/dialog";

import { PlayerDialogContent } from "./PlayerDialogContent";
import { PlayerDialogFooter } from "./PlayerDialogFooter";
import { PlayerDialogHeader } from "./PlayerDialogHeader";

export function PlayerDialog() {
  const { track } = usePlayerTrack();
  const { isOpen, setOpen } = usePlayerDialog();

  if (!track) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={true}
        className="flex flex-col border border-primary-400/25 bg-card-secondary backdrop-blur-xl p-0 sm:max-w-130 gap-0 md:gap-6 max-h-[calc(100dvh-1rem)]"
      >
        <PlayerDialogHeader />
        <PlayerDialogContent />
        <PlayerDialogFooter />
      </DialogContent>
    </Dialog>
  );
}
