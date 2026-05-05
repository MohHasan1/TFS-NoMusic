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
  const setShuffle = store.use.setShuffle();
  const setRepeatMode = store.use.setRepeatMode();
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
    const nextIndex = queueEngine.getNextIndex();

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
    const prevIndex = queueEngine.getPrevIndex();

    if (prevIndex === null) return null;

    setCurrentIndex(prevIndex);
    return queue[prevIndex] ?? null;
  };

  return {
    queue,
    currentIndex,
    currentTrack,
    shuffle,
    repeatMode,

    next,
    prev,

    setQueue,
    setCurrentIndex,
    setShuffle,
    setRepeatMode,
    addToQueue,
    removeFromQueue,
    clearQueue,
  };
}
