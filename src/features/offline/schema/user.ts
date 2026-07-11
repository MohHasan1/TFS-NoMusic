import { OFFLINE_DB } from "#offline/constants";
import type { TUserOffline } from "#offline/types";

export type TUserOfflineStore = {
  key: TUserOffline["id"];
  value: TUserOffline;
  indexes: {
    [OFFLINE_DB.DOWNLOADED_AT_INDEX]: TUserOffline["downloadedAt"];
  };
};
