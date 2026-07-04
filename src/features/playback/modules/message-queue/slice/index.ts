import { combine } from "zustand/middleware";
import { TMessageQueueItem } from "../type";

export const createMessageQueueSlice = combine(
  {
    messageQueue: [] as TMessageQueueState["messageQueue"],
  },
  (set) => ({
    setMessageQueue: (messageQueue: TMessageQueueItem[]) => set({ messageQueue }),
    clearMessageQueue: () => set({ messageQueue: [] }),
  }),
);

export type TMessageQueueState = {
  messageQueue: TMessageQueueItem[];
};

export type TMessageQueueSlice = ReturnType<typeof createMessageQueueSlice>;
