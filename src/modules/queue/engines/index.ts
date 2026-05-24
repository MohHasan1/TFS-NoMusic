import type { TNoMusic } from "#types/nomusic";
import { TQueueState } from "../slice";

const DEFAULT_REPEAT = "all";

export class QueueEngine {
  createQueueIds(tracks: TNoMusic[]) {
    return tracks.map((track) => track.id);
  }

  createQueueIdIndexMap(queueIds: TNoMusic["id"][]) {
    const queueIdIndexMap: Record<string, number> = {};

    queueIds.forEach((trackId, index) => {
      queueIdIndexMap[String(trackId)] = index;
    });

    return queueIdIndexMap;
  }

  createQueueData(tracks: TNoMusic[]) {
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

  getIndexByTrackId(queueIdIndexMap: Record<string, number>, trackId: TNoMusic["id"]) {
    return queueIdIndexMap[String(trackId)] ?? -1;
  }

  getCurrentId(queueIds: TNoMusic["id"][], currentIndex: number) {
    return queueIds[currentIndex] ?? null;
  }

  getNextIdAndIndex(
    queueIds: TNoMusic["id"][],
    currentIndex: number,
    repeatMode?: TQueueState["repeatMode"],
  ) {
    const nextIndex = this.getNextIndex(queueIds, currentIndex, repeatMode);
    if (nextIndex === -1) return { nextId: null, nextIndex: -1 };
    return { nextId: queueIds[nextIndex] ?? null, nextIndex: nextIndex };
  }

  getNextIndex(
    queueIds: TNoMusic["id"][],
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
    queueIds: TNoMusic["id"][],
    currentIndex: number,
    repeatMode?: TQueueState["repeatMode"],
  ) {
    const previousIndex = this.getPreviousIndex(queueIds, currentIndex, repeatMode);
    if (previousIndex === -1) return { previousId: null, previousIndex: -1 };
    return { previousId: queueIds[previousIndex] ?? null, previousIndex: previousIndex };
  }

  getPreviousIndex(
    queueIds: TNoMusic["id"][],
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

  getRandomIndex(queueIds: TNoMusic["id"][], currentIndex: number) {
    if (queueIds.length === 0) return -1;
    if (queueIds.length === 1) return 0;

    let randomIndex = currentIndex;

    while (randomIndex === currentIndex) {
      randomIndex = Math.floor(Math.random() * queueIds.length);
    }

    return randomIndex;
  }

  getRandomIdAndIndex(queueIds: TNoMusic["id"][], currentIndex: number) {
    const randomIndex = this.getRandomIndex(queueIds, currentIndex);

    if (randomIndex === -1) {
      return { randomId: null, randomIndex: -1 };
    }

    return {
      randomId: queueIds[randomIndex] ?? null,
      randomIndex,
    };
  }

  getNextRepeatMode(repeatMode: TQueueState["repeatMode"]) {
    if (repeatMode === "off") return "all";
    if (repeatMode === "all") return "one";
    if (repeatMode === "one") return "random";

    return "off";
  }

  appendQueueId(
    queueIds: TNoMusic["id"][],
    queueIdIndexMap: Record<string, number>,
    trackId: TNoMusic["id"],
  ) {
    const nextQueueIds = [...queueIds, trackId];

    return {
      queueIds: nextQueueIds,
      queueIdIndexMap: {
        ...queueIdIndexMap,
        [String(trackId)]: nextQueueIds.length - 1,
      },
    };
  }

  extendQueueIds(
    queueIds: TNoMusic["id"][],
    queueIdIndexMap: Record<string, number>,
    trackIds: TNoMusic["id"][],
  ) {
    const nextQueueIds = [...queueIds];
    const nextQueueIdIndexMap = { ...queueIdIndexMap };

    trackIds.forEach((trackId) => {
      nextQueueIdIndexMap[String(trackId)] = nextQueueIds.length;
      nextQueueIds.push(trackId);
    });

    return {
      queueIds: nextQueueIds,
      queueIdIndexMap: nextQueueIdIndexMap,
    };
  }
}

export const queueEngine = new QueueEngine();
