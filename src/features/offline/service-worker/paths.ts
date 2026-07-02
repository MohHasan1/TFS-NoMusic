import { OFFLINE_ROUTES } from "#constants/routes";
import { OFFLINE_STORAGE } from "#offline/constants";

export const path = {
  offline: OFFLINE_ROUTES.HOME,

  isOffline(pathname: string): boolean {
    return pathname === path.offline || pathname.startsWith(`${path.offline}/`);
  },

  isOfflineMedia(pathname: string): boolean {
    return pathname.startsWith(`${OFFLINE_STORAGE.ROOT_PATH}/`);
  },
};
