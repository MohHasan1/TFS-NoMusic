import { Suspense } from "react";
import OfflineShellPage from "#offline/components/_shell/OfflineShellPage";

// TODO: when unmount remove zustand for offline and clear all - done
export default function OfflinePage() {
  return (
    <Suspense fallback={"Loading"}>
      <OfflineShellPage />
    </Suspense>
  );
}
