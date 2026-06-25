import { Suspense } from "react";
import { LibraryHeroSection } from "#components/private/library/sections/LibraryHeroSection";
import { LibarayAudioSection } from "#components/private/library/sections/LibarayAudioSection";
import { LibarayAudioSectionSkeleton } from "#components/private/library/elements/LibarayAudioSectionSkeleton";
import { LibraryHeroSkeleton } from "#components/private/library/elements/LibraryHeroSkeleton";

export default async function LibraryPage({ params }: TProps) {
  const { id } = await params;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pt-24 pb-32 lg:px-8">
      <Suspense fallback={<LibraryHeroSkeleton />}>
        <LibraryHeroSection libId={id} />
      </Suspense>
      <Suspense fallback={<LibarayAudioSectionSkeleton />}>
        <LibarayAudioSection libId={id} />
      </Suspense>
    </div>
  );
}

type TProps = {
  params: Promise<{ id: string }>;
};
