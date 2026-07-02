import { OfflineEmptyState } from "#offline/components/shared/OfflineEmptyState";
import { RiMusic2Line } from "@remixicon/react";

export function OfflineNotFoundLibrary() {
  return (
    <OfflineEmptyState
      icon={RiMusic2Line}
      title="Library not found"
      description="This library isn't available offline on this device."
      hint="Download the library while you're online, or choose another library that's already available offline."
    />
  );
}
