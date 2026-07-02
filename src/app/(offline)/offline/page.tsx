import { Suspense } from "react";
import OfflineShellPage from "#offline/components/_shell/OfflineShellPage";

// TODO: when unmount remove zustand for offlien and clear all
export default function OfflinePage() {
  return (
    <Suspense fallback={"Loading"}>
      <OfflineShellPage />
    </Suspense>
  );
}
