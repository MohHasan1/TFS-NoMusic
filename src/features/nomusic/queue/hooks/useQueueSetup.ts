import { store } from "@/store";

export function useQueueSetup() {
  const setQueue = store.use.setQueue();
  const setCurrentIndex = store.use.setCurrentIndex();

  return {
    setQueue,
    setCurrentIndex,
  };
}
