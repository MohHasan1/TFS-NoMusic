import { RiPlayListLine } from "@remixicon/react";

import { PrivateEmptyState } from "#components/private/shared/PrivateEmptyState";
import { PRIVATE_ROUTES } from "#constants/routes";

export function PlaylistEmptyBox() {
  return <PrivateEmptyState title="No playlists yet" description="Create a playlist and add NoMusic to it — it will show up here." icon={RiPlayListLine} ctaHref={PRIVATE_ROUTES.NOMUSIC} ctaLabel="Browse NoMusic" />;
}
