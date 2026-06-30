import { RiMusic2Line } from "@remixicon/react";

import { OfflineEmptyState } from "#features/offline/components/shared/OfflineEmptyState";

export function OfflineLibraryAudioEmptyBox() {
  return (
    <OfflineEmptyState
      icon={RiMusic2Line}
      title="No NoMusic in this library yet"
      description="Saved offline tracks for this library will appear here in the same list layout as the client view."
      hint="Downloaded tracks for this library will appear here once they are available on this device."
    />
  );
}
