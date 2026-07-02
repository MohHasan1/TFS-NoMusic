import { OfflineEmptyState } from "#offline/components/shared/OfflineEmptyState";
import { RiMusic2Line } from "@remixicon/react";

export function OfflineLibraryAudioEmptyBox() {
  return (
    <OfflineEmptyState
      icon={RiMusic2Line}
      title="No NoMusic in this library yet"
      description="Downloaded NoMusic from this library will appear here, ready to play anytime."
      hint="Download this library again while you're online to access it offline."
    />
  );
}
