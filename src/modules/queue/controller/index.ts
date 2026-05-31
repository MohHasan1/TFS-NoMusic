import { store } from "#store";
import { queueEngine } from "../engines";
import type { TNoMusic } from "#types/nomusic";

class QueueController {
  setQueue(params: { sourceKey: string; tracks: TNoMusic[]; startTrackId: TNoMusic["id"] }) {
    const { sourceKey, tracks, startTrackId } = params;

    const {
      queueSourceKey,
      queueIdIndexMap,
      setQueueSourceKey,
      setQueueIds,
      setQueueIdIndexMap,
      setCurrentIndex,
    } = store.getState();

    // same source, just different track in the source is clicked
    if (queueSourceKey === sourceKey) {
      setCurrentIndex(queueEngine.getIndexByTrackId(queueIdIndexMap, startTrackId));
      return;
    }

    const { newQueueIds, newQueueIdIndexMap } = queueEngine.createQueueData(tracks);
    const currentIndex = queueEngine.getIndexByTrackId(newQueueIdIndexMap, startTrackId);

    setQueueSourceKey(sourceKey);
    setQueueIds(newQueueIds);
    setQueueIdIndexMap(newQueueIdIndexMap);
    setCurrentIndex(currentIndex);
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

  appendQueue(sourceKey: string, trackId: TNoMusic["id"]) {
    const { queueIds, queueIdIndexMap, setQueueIds, setQueueIdIndexMap, queueSourceKey } =
      store.getState();

    if (queueSourceKey !== sourceKey) {
      return;
    }

    const res = queueEngine.appendQueueId(queueIds, queueIdIndexMap, trackId);

    setQueueIds(res.queueIds);
    setQueueIdIndexMap(res.queueIdIndexMap);
  }

  extendQueue(sourceKey: string, tracks: TNoMusic[]) {
    const { queueIds, queueIdIndexMap, setQueueIds, setQueueIdIndexMap, queueSourceKey } =
      store.getState();

    if (queueSourceKey !== sourceKey) {
      return;
    }

    const res = queueEngine.extendQueue(queueIds, queueIdIndexMap, tracks);
    setQueueIds(res.queueIds);
    setQueueIdIndexMap(res.queueIdIndexMap);
  }

  clearQueue() {
    return store.use.clearQueue()();
  }
}

export const queueController = new QueueController();
