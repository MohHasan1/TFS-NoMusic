import { RiAlbumLine } from "@remixicon/react";

import { PrivateEmptyState } from "#components/private/shared/PrivateEmptyState";
import { PRIVATE_ROUTES } from "#constants/routes";

export function LibEmptyBox() {
  return (
    <PrivateEmptyState
      title="No libraries available yet"
      description="This section will appear once NoMusic items are grouped into libraries."
      icon={RiAlbumLine}
      ctaHref={PRIVATE_ROUTES.NOMUSIC}
      ctaLabel="Browse NoMusic"
    />
  );
}
