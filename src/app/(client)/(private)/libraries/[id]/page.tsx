import { Suspense } from "react";
import { LibarayAudioSectionSkeleton } from "#components/private/library/elements/LibarayAudioSectionSkeleton";
import { LibraryHeroSkeleton } from "#components/private/library/elements/LibraryHeroSkeleton";
import { LibarayAudioSection } from "#components/private/library/sections/LibarayAudioSection";
import { LibraryHeroSection } from "#components/private/library/sections/LibraryHeroSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";

export default function LibraryPage({ params }: TProps) {
  return (
    <PrivatePageShell>
      <Suspense fallback={<LibraryHeroSkeleton />}>
        <LibraryHeroSlot params={params} />
      </Suspense>
      <Suspense fallback={<LibarayAudioSectionSkeleton />}>
        <LibraryAudioSlot params={params} />
      </Suspense>
    </PrivatePageShell>
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
