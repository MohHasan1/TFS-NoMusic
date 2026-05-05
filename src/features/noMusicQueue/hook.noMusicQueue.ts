import { store } from "@/store";
import { QueueEngine } from "./engine.noMusicQueue";

const queueEngine = new QueueEngine();

export function useNoMusicQueue() {
  // --- SELECTORS (your pattern)
  const queue = store.use.queue();
  const currentIndex = store.use.currentIndex();
  const shuffle = store.use.shuffle();
  const repeatMode = store.use.repeatMode();

  const setQueue = store.use.setQueue();
  const setCurrentIndex = store.use.setCurrentIndex();
  const addToQueue = store.use.addToQueue();
  const removeFromQueue = store.use.removeFromQueue();
  const clearQueue = store.use.clearQueue();

  // --- DERIVED
  const currentTrack = queue[currentIndex] || null;

  // --- NEXT (engine decides, store updates)
  const next = () => {
    queueEngine.setState({
      queue,
      currentIndex,
      shuffle,
      repeatMode,
    });
    const nextIndex = queueEngine.next();

    if (nextIndex === null) return null;

    setCurrentIndex(nextIndex);
    return queue[nextIndex] ?? null;
  };

  // --- PREV
  const prev = () => {
    queueEngine.setState({
      queue,
      currentIndex,
      shuffle,
      repeatMode,
    });
    const prevIndex = queueEngine.prev();

    setCurrentIndex(prevIndex);
    return queue[prevIndex] ?? null;
  };

  return {
    queue,
    currentIndex,
    currentTrack,

    next,
    prev,

    setQueue,
    setCurrentIndex,
    addToQueue,
    removeFromQueue,
    clearQueue,
  };
}
