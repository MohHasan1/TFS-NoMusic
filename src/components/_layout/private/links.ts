import { RiMusic2Line, RiPlayListAddLine } from "@remixicon/react";

import { PRIVATE_ROUTES } from "#constants/routes";

export const privateNavItems = [
  {
    label: "Test",
    href: "/test",
    icon: RiMusic2Line,
  },
  {
    label: "NoMusic",
    href: PRIVATE_ROUTES.NOMUSIC,
    icon: RiMusic2Line,
  },
  {
    label: "Request NoMusic",
    href: PRIVATE_ROUTES.REQUEST_NOMUSIC,
    icon: RiPlayListAddLine,
  },
] as const;

export const privateHomeHref = PRIVATE_ROUTES.NOMUSIC;