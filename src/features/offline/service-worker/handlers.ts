import { CacheOnly, NetworkOnly, RangeRequestsPlugin } from "serwist";

import { OFFLINE_STORAGE } from "#offline/constants";

export const handler = {
  audio: new CacheOnly({
    cacheName: OFFLINE_STORAGE.NAME,
    plugins: [new RangeRequestsPlugin()],
  }),

  cover: new CacheOnly({
    cacheName: OFFLINE_STORAGE.NAME,
  }),

  navigation: new NetworkOnly(),
};
