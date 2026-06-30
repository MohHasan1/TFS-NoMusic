import { RiMusic2Line } from "@remixicon/react";

import { OfflineEmptyState } from "#features/offline/components/shared/OfflineEmptyState";

export function OfflineNotFoundLibrary() {
  return <OfflineEmptyState icon={RiMusic2Line} title="Library not found" description="This offline library is not available on this device right now." hint="Download this library first, or go back and open a different saved library." />;
}
