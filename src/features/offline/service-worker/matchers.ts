import { OFFLINE_STORAGE } from "#offline/constants";

export const matcher = {
  audio({ request, sameOrigin, url }: TCacheMatcherArgs): boolean {
    return sameOrigin && request.method === "GET" && url.pathname.startsWith(`${OFFLINE_STORAGE.NOMUSIC_PATH}/`) && url.pathname.endsWith("/audio");
  },

  cover({ request, sameOrigin, url }: TCacheMatcherArgs): boolean {
    const isOfflineCoverPath = url.pathname.startsWith(`${OFFLINE_STORAGE.NOMUSIC_PATH}/`) || url.pathname.startsWith(`${OFFLINE_STORAGE.LIBRARY_PATH}/`) || url.pathname.startsWith(`${OFFLINE_STORAGE.USER_PATH}/`);

    return sameOrigin && request.method === "GET" && isOfflineCoverPath && url.pathname.endsWith("/cover");
  },

  navigation({ request, sameOrigin }: TNavigationMatcherArgs): boolean {
    return sameOrigin && request.mode === "navigate";
  },
};

type TCacheMatcherArgs = {
  request: Request;
  sameOrigin: boolean;
  url: URL;
};

type TNavigationMatcherArgs = {
  request: Request;
  sameOrigin: boolean;
};
