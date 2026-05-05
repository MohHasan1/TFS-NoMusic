import type { NoMusicTrack } from "@/types/no-music.type";

export class QueueEngine {
  constructor(private state: QueueState = createInitialQueueState()) {}

  // update state reference
  setState(state: QueueState) {
    this.state = state;
  }

  getCurrent(): NoMusicTrack | null {
    return this.state.queue[this.state.currentIndex] || null;
  }

  getNextIndex(): number | null {
    const { queue, currentIndex, repeatMode } = this.state;

    if (queue.length === 0) return null;

    const isLast = currentIndex >= queue.length - 1;

    if (repeatMode === "one") {
      return currentIndex;
    }

    if (repeatMode === "all" && isLast) {
      return 0;
    }

    if (isLast) {
      return null;
    }

    return currentIndex + 1;
  }

  getPrevIndex(): number {
    const { currentIndex, queue, repeatMode } = this.state;

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

  next(): number | null {
    const { shuffle } = this.state;

    if (shuffle) {
      return this.getRandomIndex();
    }

    return this.getNextIndex();
  }

  prev(): number {
    return this.getPrevIndex();
  }

  mergeQueue(newTracks: NoMusicTrack[]) {
    this.state = {
      ...this.state,
      queue: [...this.state.queue, ...newTracks],
    };
  }
}

export type RepeatMode = "off" | "one" | "all";

export type QueueState = {
  queue: NoMusicTrack[];
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
