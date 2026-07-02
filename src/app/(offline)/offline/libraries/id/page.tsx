import { OfflineLibraryViewRedirect } from "#offline/components/library/views/OfflineLibraryViewRedirect";
import { Suspense } from "react";

export default function OfflineLibraryPage() {
  return (
    <Suspense fallback={<OfflineLibraryRedirectFallback />}>
      <OfflineLibraryViewRedirect />
    </Suspense>
  );
}

function OfflineLibraryRedirectFallback() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pt-24 pb-32 text-sm text-muted-foreground lg:px-8">
      Opening your offline library...
    </div>
  );
}
