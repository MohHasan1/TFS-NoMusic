import { Suspense } from "react";
import { LibarayAudioSectionSkeleton } from "#components/private/library/elements/LibarayAudioSectionSkeleton";
import { LibraryHeroSkeleton } from "#components/private/library/elements/LibraryHeroSkeleton";
import { LibarayAudioSection } from "#components/private/library/sections/LibarayAudioSection";
import { LibraryHeroSection } from "#components/private/library/sections/LibraryHeroSection";

export default function LibraryPage({ params }: TProps) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pt-24 pb-32 lg:px-8">
      <Suspense fallback={<LibraryHeroSkeleton />}>
        <LibraryHeroSlot params={params} />
      </Suspense>
      <Suspense fallback={<LibarayAudioSectionSkeleton />}>
        <LibraryAudioSlot params={params} />
      </Suspense>
    </div>
  );
}

async function LibraryHeroSlot({ params }: TProps) {
  const { id } = await params;
  return <LibraryHeroSection libId={id} />;
}

async function LibraryAudioSlot({ params }: TProps) {
  const { id } = await params;
  return <LibarayAudioSection libId={id} />;
}

type TProps = {
  params: Promise<{ id: string }>;
};
