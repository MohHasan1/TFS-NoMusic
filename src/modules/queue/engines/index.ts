import type { TNoMusic } from "#types/nomusic";

export class QueueEngine {
  createQueueIds(tracks: TNoMusic[]) {
    return tracks.map((track) => track.id);
  }

  findIndexByTrackId(queueIds: TNoMusic["id"][], trackId: TNoMusic["id"]) {
    return queueIds.findIndex((id) => id === trackId);
  }

  getCurrentId(queueIds: TNoMusic["id"][], currentIndex: number) {
    return queueIds[currentIndex] ?? null;
  }

  getNextId(queueIds: TNoMusic["id"][], currentIndex: number) {
    return queueIds[currentIndex + 1] ?? null;
  }

  getPreviousId(queueIds: TNoMusic["id"][], currentIndex: number) {
    return queueIds[currentIndex - 1] ?? null;
  }

  appendId(queueIds: TNoMusic["id"][], trackId: TNoMusic["id"]) {
    return [...queueIds, trackId];
  }

  removeId(queueIds: TNoMusic["id"][], trackId: TNoMusic["id"]) {
    return queueIds.filter((id) => id !== trackId);
  }

  insertAfterCurrent(queueIds: TNoMusic["id"][], currentIndex: number, trackId: TNoMusic["id"]) {
    const insertIndex = Math.max(0, currentIndex + 1);

    return [...queueIds.slice(0, insertIndex), trackId, ...queueIds.slice(insertIndex)];
  }

  extendQueue(queueIds: TNoMusic["id"][], trackIds: TNoMusic["id"][]) {
    return [...queueIds, ...trackIds];
  }
}

export const queueEngine = new QueueEngine();
