import { RiAlbumFill, RiDownload2Line, RiMusic2Line } from "@remixicon/react";

import { OFFLINE_ROUTES } from "#constants/routes";

export const offlineNavItems = [
  {
    label: "NoMusic",
    href: OFFLINE_ROUTES.NOMUSIC,
    icon: RiMusic2Line,
  },
  {
    label: "Libraries",
    href: OFFLINE_ROUTES.LIBRARIES,
    icon: RiAlbumFill,
  },
  {
    label: "Test",
    href: OFFLINE_ROUTES.TEST,
    icon: RiDownload2Line,
  },
] as const;

export const offlineHomeHref = OFFLINE_ROUTES.HOME;
