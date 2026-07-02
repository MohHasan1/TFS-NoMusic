import { OfflineEmptyState } from "#features/offline/components/shared/OfflineEmptyState";
import { RiAlbumFill } from "@remixicon/react";

export default function LibEmptyBox() {
  return (
    <OfflineEmptyState
      title="No downloaded libraries yet"
      description="Libraries you save for offline access will appear here on this device."
      hint="Download a library while online to see it here."
      icon={RiAlbumFill}
    />
  );
}
