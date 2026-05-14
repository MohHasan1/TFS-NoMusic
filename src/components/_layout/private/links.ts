import { PRIVATE_ROUTES } from "#constants/routes";

export const privateNavItems = [
  {
    href: PRIVATE_ROUTES.NOMUSIC,
    label: "NoMusic",
  },
  {
    href: PRIVATE_ROUTES.REQUEST_NOMUSIC,
    label: "Request NoMusic",
  },
] as const;

export const privateHomeHref = PRIVATE_ROUTES.NOMUSIC;
