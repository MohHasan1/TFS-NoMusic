import type { TNoMusic } from "#types/nomusic";
import { DEFAULT_REPEAT } from "../constants";
import { TQueueState } from "../slice";

export class QueueEngine {
  createQueueIds(tracks: TNoMusic[]) {
    return tracks.map((track) => track.id);
  }

  createQueueIdData(tracks: TNoMusic[]) {
    const newQueueIds: TNoMusic["id"][] = [];
    const newQueueIdIndexMap: Record<string, number> = {};

    tracks.forEach((track, index) => {
      newQueueIds.push(track.id);
      newQueueIdIndexMap[String(track.id)] = index;
    });

    return {
      newQueueIds,
      newQueueIdIndexMap,
    };
  }

  createQueueIdIndexMap(queueIds: TQueueState["queueIds"]) {
    const queueIdIndexMap: Record<string, number> = {};

    queueIds.forEach((trackId, index) => {
      queueIdIndexMap[String(trackId)] = index;
    });

    return queueIdIndexMap;
  }

  getIndexByTrackId(queueIdIndexMap: TQueueState["queueIdIndexMap"], trackId: TNoMusic["id"]) {
    return queueIdIndexMap[String(trackId)] ?? -1;
  }

  getCurrentId(queueIds: TQueueState["queueIds"], currentIndex: number) {
    return queueIds[currentIndex] ?? null;
  }

  getNextIdAndIndex(
    queueIds: TQueueState["queueIds"],
    currentIndex: number,
    repeatMode?: TQueueState["repeatMode"],
  ) {
    const nextIndex = this.getNextIndex(queueIds, currentIndex, repeatMode);
    if (nextIndex === -1) return { nextId: null, nextIndex: -1 };
    return { nextId: queueIds[nextIndex] ?? null, nextIndex: nextIndex };
  }

  getNextIndex(
    queueIds: TQueueState["queueIds"],
    currentIndex: number,
    repeatMode: TQueueState["repeatMode"] = DEFAULT_REPEAT,
  ) {
    if (queueIds.length === 0) return -1;
    if (repeatMode === "one") {
      return currentIndex;
    }

    if (repeatMode === "random") return this.getRandomIndex(queueIds, currentIndex);

    const nextIndex = currentIndex + 1;
    if (nextIndex < queueIds.length) {
      return nextIndex;
    }

    if (repeatMode === "all") {
      return 0;
    }

    return -1;
  }

  getPreviousIdAndIndex(
    queueIds: TQueueState["queueIds"],
    currentIndex: number,
    repeatMode?: TQueueState["repeatMode"],
  ) {
    const previousIndex = this.getPreviousIndex(queueIds, currentIndex, repeatMode);
    if (previousIndex === -1) return { previousId: null, previousIndex: -1 };
    return { previousId: queueIds[previousIndex] ?? null, previousIndex: previousIndex };
  }

  getPreviousIndex(
    queueIds: TQueueState["queueIds"],
    currentIndex: number,
    repeatMode: TQueueState["repeatMode"] = DEFAULT_REPEAT,
  ) {
    if (queueIds.length === 0) return -1;

    if (repeatMode === "one") {
      return currentIndex;
    }

    if (repeatMode === "random") return this.getRandomIndex(queueIds, currentIndex);

    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      return previousIndex;
    }

    if (repeatMode === "all") {
      return queueIds.length - 1;
    }

    return -1;
  }

  getRandomIndex(queueIds: TQueueState["queueIds"], currentIndex: number) {
    if (queueIds.length === 0) return -1;
    if (queueIds.length === 1) return 0;

    let randomIndex = currentIndex;

    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * queueIds.length);
    }

    return randomIndex;
  }

  getRandomIdAndIndex(queueIds: TQueueState["queueIds"], currentIndex: number) {
    const randomIndex = this.getRandomIndex(queueIds, currentIndex);

    if (randomIndex === -1) {
      return { randomId: null, randomIndex: -1 };
    }

    return {
      randomId: queueIds[randomIndex] ?? null,
      randomIndex,
    };
  }

  getNextRepeatMode(currentRepeatMode: TQueueState["repeatMode"]) {
    if (currentRepeatMode === "off") return "all";
    if (currentRepeatMode === "all") return "one";
    if (currentRepeatMode === "one") return "random";

    return "off";
  }

  extendQueue(
    queueIds: TQueueState["queueIds"],
    queueIdIndexMap: TQueueState["queueIdIndexMap"],
    tracks: TNoMusic[],
  ) {
    const nextQueueIds = [...queueIds];
    const nextQueueIdIndexMap = { ...queueIdIndexMap };

    tracks.forEach((track) => {
      nextQueueIdIndexMap[String(track.id)] = nextQueueIds.length;
      nextQueueIds.push(track.id);
    });

    return {
      queueIds: nextQueueIds,
      queueIdIndexMap: nextQueueIdIndexMap,
    };
  }
}

export const queueEngine = new QueueEngine();
