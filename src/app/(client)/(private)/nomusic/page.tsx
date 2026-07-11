import { Suspense } from "react";

import { NoMusicGridSkeleton } from "#components/private/nomusic/elements/NoMusicGridSkeleton";
import { NoMusicLanguageFilterSkeleton } from "#components/private/nomusic/elements/NoMusicLanguageFilterSkeleton";
import NoMusicHeaderSection from "#components/private/nomusic/sections/NoMusicHeaderSection";
import { NoMusicLanguageFilterSection } from "#components/private/nomusic/sections/NoMusicLanguageFilterSection";
import NoMusicContentSection from "#components/private/nomusic/sections/noMusicContentSection";
import { PrivatePageHeader } from "#components/private/shared/PrivatePageHeader";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";

export default function NoMusicPage() {
  return (
    <PrivatePageShell className="pb-60">
      <Suspense fallback={<PrivatePageHeader title="Collection" description="Explore private NoMusic vocals in one clean collection." />}>
        <NoMusicHeaderSection />
      </Suspense>
      <Suspense fallback={<NoMusicLanguageFilterSkeleton />}>
        <NoMusicLanguageFilterSection />
      </Suspense>
      <Suspense fallback={<NoMusicGridSkeleton />}>
        <NoMusicContentSection />
      </Suspense>
    </PrivatePageShell>
  );
}
