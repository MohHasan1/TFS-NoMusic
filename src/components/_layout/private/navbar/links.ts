import { RiAlbumFill, RiMusic2Line, RiPlayListAddLine, RiPlayListFill } from "@remixicon/react";

import { PRIVATE_ROUTES } from "#constants/routes";

export const privateNavItems = [
  {
    label: "Collections",
    href: PRIVATE_ROUTES.NOMUSIC,
    icon: RiMusic2Line,
  },
  {
    label: "Libraries",
    href: PRIVATE_ROUTES.LIBRARIES,
    icon: RiAlbumFill,
  },
  {
    label: "Playlists",
    href: PRIVATE_ROUTES.PLAYLISTS,
    icon: RiPlayListFill,
  },
  {
    label: "Request",
    href: PRIVATE_ROUTES.REQUEST_NOMUSIC,
    icon: RiPlayListAddLine,
  },
] as const;

export const privateHomeHref = PRIVATE_ROUTES.NOMUSIC;
