import { RiPlayListLine } from "@remixicon/react";

import { PrivateEmptyState } from "#components/private/shared/PrivateEmptyState";
import { PRIVATE_ROUTES } from "#constants/routes";

export function PlaylistNotFoundBox() {
  return (
    <PrivateEmptyState
      title="Playlist not found"
      description="It may have been deleted, or it's private and not shared with you."
      icon={RiPlayListLine}
      ctaHref={PRIVATE_ROUTES.PLAYLISTS}
      ctaLabel="Your playlists"
    />
  );
}
