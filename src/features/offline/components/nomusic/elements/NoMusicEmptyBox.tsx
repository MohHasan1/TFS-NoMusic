import { OfflineEmptyState } from "#offline/components/shared/OfflineEmptyState";
import { RiMusic2Line } from "@remixicon/react";

export default function NoMusicEmptyBox() {
  return (
    <OfflineEmptyState
      title="No downloaded NoMusic yet"
      description="Keep your favorite NoMusic with you. Everything you download will appear here for offline listening."
      hint="Download some NoMusic while you're online to see it here."
      icon={RiMusic2Line}
    />
  );
}
