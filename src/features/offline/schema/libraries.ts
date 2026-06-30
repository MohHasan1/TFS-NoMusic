import { OFFLINE_DB } from "#offline/constants";
import { TLibraryOffline } from "#offline/types";

export type TLibrariesOfflineStore = {
  key: TLibraryOffline["id"];
  value: TLibraryOffline;
  indexes: {
    [OFFLINE_DB.DOWNLOADED_AT_INDEX]: TLibraryOffline["downloadedAt"];
  };
};
