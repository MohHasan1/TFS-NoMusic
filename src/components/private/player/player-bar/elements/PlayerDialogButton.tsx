"use client";

import { Button } from "#components/ui/button";
import { usePlayerDialog } from "#modules/player-dialog/hooks/indes";

const PlayerDialogButton = ({ children, className }: TProps) => {
  const { toggle } = usePlayerDialog();

  return (
    <Button type="button" variant="ghost" onClick={toggle} className={className}>
      {children}
    </Button>
  );
};

export default PlayerDialogButton;

type TProps = {
  children: React.ReactNode;
  className?: string;
};
