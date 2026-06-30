import { OFFLINE_DB } from "#offline/constants";
import { TNomusicOffline } from "#offline/types";

export type TNomusicOfflineStore = {
  key: TNomusicOffline["id"];
  value: TNomusicOffline;
  indexes: {
    [OFFLINE_DB.DOWNLOADED_AT_INDEX]: TNomusicOffline["downloadedAt"];
  };
};

