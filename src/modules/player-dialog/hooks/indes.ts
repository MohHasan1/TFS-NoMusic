import { useStore } from "#store";

export function usePlayerDialog() {
  const open = useStore((state) => state.openPlayerDialog);
  const close = useStore((state) => state.closePlayerDialog);
  const toggle = useStore((state) => state.togglePlayerDialog);
  const isOpen = useStore((state) => state.isPlayerDialogOpen);
  const setOpen = useStore((state) => state.setPlayerDialogOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
    setOpen,
  };
}
