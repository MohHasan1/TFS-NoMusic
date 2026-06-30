import { RiMusic2Line } from "@remixicon/react";

import { OfflineEmptyState } from "#features/offline/components/shared/OfflineEmptyState";

export default function NoMusicEmptyBox() {
  return (
    <OfflineEmptyState
      title="No downloaded NoMusic yet"
      description="Songs you save for offline playback will appear here so you can open them without a connection."
      hint="Download a song while online to see it here."
      icon={RiMusic2Line}
    />
  );
}
