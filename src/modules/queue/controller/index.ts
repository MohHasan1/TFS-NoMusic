import { store } from "#store";
import type { TNoMusic } from "#types/nomusic";
import { queueEngine } from "../engines";

class QueueController {
  setQueue(tracks: TNoMusic[], startTrackId: TNoMusic["id"]) {
    const { setQueueIds, setCurrentIndex } = store.getState();

    const { newQueueIds, newQueueIdIndexMap } = queueEngine.createQueueData(tracks);
    const currentIndex = queueEngine.getIndexByTrackId(newQueueIdIndexMap, startTrackId);

    setQueueIds(newQueueIds);
    setCurrentIndex(currentIndex);
  }

  setQueueForSource(params: {
    sourceKey: string;
    tracks: TNoMusic[];
    startTrackId: TNoMusic["id"];
  }) {
    const { sourceKey, tracks, startTrackId } = params;

    const {
      queueSourceKey,
      queueIdIndexMap,
      setQueueSourceKey,
      setQueueIds,
      setQueueIdIndexMap,
      setCurrentIndex,
    } = store.getState();

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
    const { queueIds, currentIndex, setCurrentIndex } = store.getState();

    const nextId = queueEngine.getNextId(queueIds, currentIndex);

    if (!nextId) return null;

    setCurrentIndex(currentIndex + 1);

    return nextId;
  }

  getPreviousTrackId() {
    const { queueIds, currentIndex, setCurrentIndex } = store.getState();

    const previousId = queueEngine.getPreviousId(queueIds, currentIndex);

    if (!previousId) return null;

    setCurrentIndex(currentIndex - 1);

    return previousId;
  }

  addToQueue(trackId: TNoMusic["id"]) {
    const { queueIds, setQueueIds } = store.getState();

    setQueueIds(queueEngine.appendId(queueIds, trackId));
  }

  //   TODO: what needs check
  playNext(trackId: TNoMusic["id"]) {
    const { queueIds, currentIndex, setQueueIds } = store.getState();

    setQueueIds(queueEngine.insertAfterCurrent(queueIds, currentIndex, trackId));
  }

  removeFromQueue(trackId: TNoMusic["id"]) {
    const { queueIds, setQueueIds } = store.getState();

    setQueueIds(queueEngine.removeId(queueIds, trackId));
  }

  extendQueue(tracks: TNoMusic[]) {
    const { queueIds, setQueueIds } = store.getState();

    const newQueueIds = queueEngine.createQueueIds(tracks);
    const fullQueueIds = queueEngine.extendQueue(queueIds, newQueueIds);

    setQueueIds(fullQueueIds);
  }

  clearQueue() {
    store.getState().clearQueue();
  }
}

export const queueController = new QueueController();
