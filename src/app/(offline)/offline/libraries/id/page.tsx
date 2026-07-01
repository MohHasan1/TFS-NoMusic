import { Suspense } from "react";

import { LibarayAudioSectionSkeleton } from "#components/private/library/elements/LibarayAudioSectionSkeleton";
import { LibraryHeroSkeleton } from "#components/private/library/elements/LibraryHeroSkeleton";
import { OfflineLibraryAudioSection } from "#features/offline/components/library/sections/OfflineLibraryAudioSection";
import { OfflineLibraryHeroSection } from "#features/offline/components/library/sections/OfflineLibraryHeroSection";

export default function OfflineLibraryPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pt-24 pb-32 lg:px-8">
      <Suspense fallback={<LibraryHeroSkeleton />}>
        <OfflineLibraryHeroSection />
      </Suspense>
      <Suspense fallback={<LibarayAudioSectionSkeleton />}>
        <OfflineLibraryAudioSection />
      </Suspense>
    </div>
  );
}


