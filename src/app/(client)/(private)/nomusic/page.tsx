import { Suspense } from "react";

import { NoMusicLanguageFilterSection } from "#components/private/nomusic/sections/NoMusicLanguageFilterSection";
import { NoMusicLanguageFilterSkeleton } from "#components/private/nomusic/elements/NoMusicLanguageFilterSkeleton";
import NoMusicContentSection from "#components/private/nomusic/sections/noMusicContentSection";
import { NoMusicGridSkeleton } from "#components/private/nomusic/elements/NoMusicGridSkeleton";
import NoMusicHeaderSection from "#components/private/nomusic/sections/NoMusicHeaderSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";

export default function NoMusicPage() {
  return (
    <PrivatePageShell>
      <NoMusicHeaderSection />
      <Suspense fallback={<NoMusicLanguageFilterSkeleton />}>
        <NoMusicLanguageFilterSection />
      </Suspense>
      <Suspense fallback={<NoMusicGridSkeleton />}>
        <NoMusicContentSection />
      </Suspense>
    </PrivatePageShell>
  );
}
