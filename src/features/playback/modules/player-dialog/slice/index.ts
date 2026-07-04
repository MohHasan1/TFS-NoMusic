import { combine } from "zustand/middleware";

export const createPlayerDialogSlice = combine(
  {
    isPlayerDialogOpen: false,
  },
  (set) => ({
    openPlayerDialog: () => set({ isPlayerDialogOpen: true }),
    closePlayerDialog: () => set({ isPlayerDialogOpen: false }),
    togglePlayerDialog: () => set((state) => ({ isPlayerDialogOpen: !state.isPlayerDialogOpen })),
    setPlayerDialogOpen: (open: boolean) => set({ isPlayerDialogOpen: open }),
  }),
);

export type TPlayerDialogSlice = ReturnType<typeof createPlayerDialogSlice>;
