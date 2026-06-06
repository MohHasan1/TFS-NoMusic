"use client";

import { Button } from "#components/ui/button";
import { usePlayerDialog } from "@/modules/player-dialog/hooks/indes";
import { PlayerDialog } from "./PlayerDialog";

export function PlayerDialogTrigger() {
  const { open } = usePlayerDialog();

  return (
    <>
      <Button onClick={open}>Open player</Button>
      <PlayerDialog />
    </>
  );
}
