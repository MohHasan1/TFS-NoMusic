import { RiMusic2Line } from "@remixicon/react";

import { PrivateEmptyState } from "#components/private/shared/PrivateEmptyState";
import { PRIVATE_ROUTES } from "#constants/routes";

export function LibarayAudioEmptyBox() {
  return (
    <PrivateEmptyState
      title="No NoMusic in this library yet"
      description="Add NoMusic to this library and it will appear here once it is linked."
      icon={RiMusic2Line}
      ctaHref={PRIVATE_ROUTES.NOMUSIC}
      ctaLabel="Browse NoMusic"
    />
  );
}
