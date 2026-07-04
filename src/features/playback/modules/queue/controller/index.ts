import { store } from "#store";
import { queueEngine } from "../engines";
import type { TNoMusic } from "#types/nomusic";

class QueueController {
  setQueue(params: {
    sourceKey: string;
    tracks: TNoMusic[];
    startTrackId: TNoMusic["id"];
    forceRebuild?: boolean;
  }) {
    const { sourceKey, tracks, startTrackId, forceRebuild = false } = params;

    const {
      queueSourceKey,
      queueIdIndexMap,

      setQueueIds,
      setCurrentIndex,
      setQueueSourceKey,
      setQueueIdIndexMap,
    } = store.getState();

    // Same source: just different track is clicked in the same source - current-index is just upated:
    if (queueSourceKey === sourceKey && !forceRebuild) {
      setCurrentIndex(queueEngine.getIndexByTrackId(queueIdIndexMap, startTrackId));
      return;
    }

    // New source or existing source (forceRebuild):
    const { newQueueIds, newQueueIdIndexMap } = queueEngine.createQueueIdData(tracks);
    const currentIndex = queueEngine.getIndexByTrackId(newQueueIdIndexMap, startTrackId);

    setQueueSourceKey(sourceKey);
    setQueueIds(newQueueIds);
    setQueueIdIndexMap(newQueueIdIndexMap);
    setCurrentIndex(currentIndex);
  }

  extendQueue(sourceKey: string, tracks: TNoMusic[]) {
    const { queueIds, queueIdIndexMap, setQueueIds, setQueueIdIndexMap, queueSourceKey } =
      store.getState();

    // If source is not equal, queue should not be extended - very important:
    if (queueSourceKey !== sourceKey) {
      return;
    }

    const res = queueEngine.extendQueue(queueIds, queueIdIndexMap, tracks);

    setQueueIds(res.queueIds);
    setQueueIdIndexMap(res.queueIdIndexMap);
  }

  getCurrentTrackId() {
    const { queueIds, currentIndex } = store.getState();
    return queueEngine.getCurrentId(queueIds, currentIndex);
  }

  getNextTrackId() {
    const { repeatMode, queueIds, currentIndex, setCurrentIndex } = store.getState();

    const { nextId, nextIndex } = queueEngine.getNextIdAndIndex(queueIds, currentIndex, repeatMode);
    if (!nextId) return null;

    setCurrentIndex(nextIndex);
    return nextId;
  }

  getPreviousTrackId() {
    const { repeatMode, queueIds, currentIndex, setCurrentIndex } = store.getState();

    const { previousId, previousIndex } = queueEngine.getPreviousIdAndIndex(
      queueIds,
      currentIndex,
      repeatMode,
    );
    if (!previousId) return null;

    setCurrentIndex(previousIndex);
    return previousId;
  }

  getNextRepeatMode() {
    const { repeatMode } = store.getState();
    return queueEngine.getNextRepeatMode(repeatMode);
  }

  clearQueue() {
    store.getState().clearQueue();
  }
}

export const queueController = new QueueController();
