import { Suspense } from "react";

import { NoMusicLanguageFilterSection } from "#components/private/nomusic/sections/NoMusicLanguageFilterSection";
import { NoMusicLanguageFilterSkeleton } from "#components/private/nomusic/elements/NoMusicLanguageFilterSkeleton";
import NoMusicContentSection from "#components/private/nomusic/sections/NoMusicContentSection";
import { NoMusicGridSkeleton } from "#components/private/nomusic/elements/NoMusicGridSkeleton";
import NoMusicHeaderSection from "#components/private/nomusic/sections/NoMusicHeaderSection";

export default function NoMusicPage() {
  return (
    <div className="flex-1 pt-24 pb-32 max-w-7xl mx-auto w-full px-4 lg:px-8 space-y-10">
      <NoMusicHeaderSection />
      <Suspense fallback={<NoMusicLanguageFilterSkeleton />}>
        <NoMusicLanguageFilterSection />
      </Suspense>
      <Suspense fallback={<NoMusicGridSkeleton />}>
        <NoMusicContentSection />
      </Suspense>
    </div>
  );
}
