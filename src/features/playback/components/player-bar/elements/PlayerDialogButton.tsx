"use client";

import { usePlayerDialog } from "#playback-dialog/hooks/indes";
import { Button } from "#components/ui/button";

const PlayerDialogButton = ({ children, className }: TProps) => {
  const { toggle } = usePlayerDialog();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={toggle}
      data-ph-capture-attribute-action="player_dialog_pressed"
      className={className}
    >
      {children}
    </Button>
  );
};

export default PlayerDialogButton;

type TProps = {
  children: React.ReactNode;
  className?: string;
};
