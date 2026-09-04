import { RiMusic2Line } from "@remixicon/react";

import { PrivateEmptyState } from "#components/private/shared/PrivateEmptyState";
import { PRIVATE_ROUTES } from "#constants/routes";

export function PlaylistAudioEmptyBox() {
  return (
    <PrivateEmptyState
      title="No NoMusic in this playlist yet"
      description="Add NoMusic to this playlist and it will appear here."
      icon={RiMusic2Line}
      ctaHref={PRIVATE_ROUTES.NOMUSIC}
      ctaLabel="Browse NoMusic"
    />
  );
}
