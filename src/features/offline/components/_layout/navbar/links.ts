import { RiAlbumFill, RiHomeLine, RiMusic2Line } from "@remixicon/react";

import { OFFLINE_ROUTES } from "#constants/routes";

export const offlineNavItems = [
  {
    label: "Home",
    href: OFFLINE_ROUTES.HOME,
    matchViews: [null],
    icon: RiHomeLine,
  },
  {
    label: "NoMusic",
    href: OFFLINE_ROUTES.NOMUSIC,
    matchViews: ["nomusic"],
    icon: RiMusic2Line,
  },
  {
    label: "Libraries",
    href: OFFLINE_ROUTES.LIBRARIES,
    matchViews: ["libraries", "library"],
    icon: RiAlbumFill,
  },
] as const;

export const offlineHomeHref = OFFLINE_ROUTES.HOME;
