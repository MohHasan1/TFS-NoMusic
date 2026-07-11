import type { TLibrary } from "#types/library";
import type { TNoMusic } from "#types/nomusic";
import type { TUser } from "#types/user";

export type TNomusicOffline = TNoMusic & {
  downloadedAt: number;
};

export type TLibraryOffline = TLibrary & {
  nomusicIds: Array<TNoMusic["id"]>;
  downloadedAt: number;
};

export type TUserOffline = TUser & {
  downloadedAt: number;
};
