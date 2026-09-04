import { RiErrorWarningLine } from "@remixicon/react";

import { PrivateEmptyState } from "#components/private/shared/PrivateEmptyState";

export function PlaylistErrorBox() {
  return <PrivateEmptyState title="Couldn't load your playlists" description="Something went wrong on our end. Refresh the page to try again." icon={RiErrorWarningLine} />;
}
