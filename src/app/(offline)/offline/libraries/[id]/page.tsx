import { Suspense } from "react";

import { LibarayAudioSectionSkeleton } from "#components/private/library/elements/LibarayAudioSectionSkeleton";
import { LibraryHeroSkeleton } from "#components/private/library/elements/LibraryHeroSkeleton";
import { OfflineLibraryAudioSection } from "#features/offline/components/library/sections/OfflineLibraryAudioSection";
import { OfflineLibraryHeroSection } from "#features/offline/components/library/sections/OfflineLibraryHeroSection";

export default function OfflineLibraryPage({ params }: TProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pt-24 pb-32 lg:px-8">
      <Suspense fallback={<LibraryHeroSkeleton />}>
        <OfflineLibraryHeroSlot params={params} />
      </Suspense>
      <Suspense fallback={<LibarayAudioSectionSkeleton />}>
        <OfflineLibraryAudioSlot params={params} />
      </Suspense>
    </div>
  );
}

async function OfflineLibraryHeroSlot({ params }: TProps) {
  const { id } = await params;

  return <OfflineLibraryHeroSection libId={id} />;
}

async function OfflineLibraryAudioSlot({ params }: TProps) {
  const { id } = await params;

  return <OfflineLibraryAudioSection libId={id} />;
}

type TProps = {
  params: Promise<{ id: string }>;
};
