import { TNoMusic } from "@/types/nomusic";

export class QueueEngine {
  constructor(private state: QueueState = createInitialQueueState()) {}

  // update state reference
  setState(state: QueueState) {
    this.state = state;
  }

  getCurrent(): TNoMusic | null {
    return this.state.queue[this.state.currentIndex] || null;
  }

  getNextIndex(): number | null {
    const { queue, currentIndex, repeatMode, shuffle } = this.state;

    if (queue.length === 0) return null;

    const isLast = currentIndex >= queue.length - 1;

    // Repeat-one must beat shuffle; otherwise shuffle would skip away from the looped track.
    if (repeatMode === "one") {
      return currentIndex;
    }

    if (shuffle) {
      return this.getRandomIndex();
    }

    if (repeatMode === "all" && isLast) {
      return 0;
    }

    if (isLast) {
      return null;
    }

    return currentIndex + 1;
  }

  getPrevIndex(): number | null {
    const { currentIndex, queue, repeatMode, shuffle } = this.state;

    if (queue.length === 0) return null;

    // Repeat-one must beat shuffle; otherwise shuffle would skip away from the looped track.
    if (repeatMode === "one") {
      return currentIndex;
    }

    if (shuffle) {
      return this.getRandomIndex();
    }

    if (currentIndex > 0) return currentIndex - 1;

    if (repeatMode === "all") {
      return queue.length - 1;
    }

    return 0;
  }

  getRandomIndex(): number {
    const { queue, currentIndex } = this.state;

    if (queue.length <= 1) return currentIndex;

    let next = currentIndex;

    while (next === currentIndex) {
      next = Math.floor(Math.random() * queue.length);
    }

    return next;
  }

  mergeQueue(newTracks: TNoMusic[]) {
    this.state = {
      ...this.state,
      queue: [...this.state.queue, ...newTracks],
    };
  }
}

export type RepeatMode = "off" | "one" | "all";

export type QueueState = {
  queue: TNoMusic[];
  currentIndex: number;
  shuffle: boolean;
  repeatMode: RepeatMode;
};

function createInitialQueueState(): QueueState {
  return {
    queue: [],
    currentIndex: 0,
    shuffle: false,
    repeatMode: "off",
  };
}
