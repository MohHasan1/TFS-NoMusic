import { RiMusic2Line } from "@remixicon/react";
import { PrivateEmptyState } from "#components/private/shared/PrivateEmptyState";
import { PRIVATE_ROUTES } from "#constants/routes";

export function NoMusicEmptyBox() {
  return (
    <PrivateEmptyState
      title="No NoMusic available yet"
      description="Request a track and it will show up here once it is added."
      icon={RiMusic2Line}
      ctaHref={PRIVATE_ROUTES.REQUEST_NOMUSIC}
      ctaLabel="Request NoMusic"
    />
  );
}
