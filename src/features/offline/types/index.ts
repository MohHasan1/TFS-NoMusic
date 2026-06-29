import type { TLibrary } from "#types/library";
import type { TNoMusic } from "#types/nomusic";

export type TNomusicOffline = TNoMusic & {
  downloadedAt: number;
};

export type TLibraryOffline = TLibrary & {
  nomusicIds: Array<TNoMusic["id"]>;
  downloadedAt: number;
};
