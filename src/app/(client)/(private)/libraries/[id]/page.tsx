import { Suspense } from "react";
import { LibarayAudioSectionSkeleton } from "#components/private/library/elements/LibarayAudioSectionSkeleton";
import { LibraryHeroSkeleton } from "#components/private/library/elements/LibraryHeroSkeleton";
import { LibarayAudioSection } from "#components/private/library/sections/LibarayAudioSection";
import { LibraryHeroSection } from "#components/private/library/sections/LibraryHeroSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";
import { cacheLife, cacheTag } from "next/cache";
import { listLibraries } from "#services/libraries/libraries.ports";

export async function generateStaticParams() {
  const res = await listLibraries({ limit: 1 });
  if (!res.isSuccess) return [];

  return [
    {
      id: String(res.data.docs[0].id),
    },
  ];
}

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
  "use cache";

  const { id } = await params;

  cacheLife("max");
  cacheTag(`library:${id}`);

  return <LibraryHeroSection libId={id} />;
}

async function LibraryAudioSlot({ params }: TProps) {
  "use cache";

  const { id } = await params;

  cacheLife("max");
  cacheTag(`library-audio:${id}`);

  return <LibarayAudioSection libId={id} />;
}

type TProps = {
  params: Promise<{ id: string }>;
};
