import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { Suspense } from "react";
import { LibarayAudioSectionSkeleton } from "#components/private/library/elements/LibarayAudioSectionSkeleton";
import { LibraryHeroSkeleton } from "#components/private/library/elements/LibraryHeroSkeleton";
import { LibarayAudioSection } from "#components/private/library/sections/LibarayAudioSection";
import { LibraryHeroSection } from "#components/private/library/sections/LibraryHeroSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";
import { CACHE_TAG } from "#constants/cache-tags";
import { listLibraries } from "#services/libraries/libraries.ports";

export const metadata: Metadata = {
  title: "Library",
  description: "Browse tracks in your private NoMusic library.",
};

export async function generateStaticParams() {
  const res = await listLibraries({ limit: 25 });
  if (!res.isSuccess) return [];

  return res.data.docs.map((lib) => ({
    id: String(lib.id),
  }));
}

export default function LibraryPage({ params }: TProps) {
  return (
    <PrivatePageShell>
      <Suspense fallback={<LibraryHeroSkeleton />}>
        {params.then(({ id }) => (
          <LibraryHeroSlot id={id} />
        ))}
      </Suspense>
      <Suspense fallback={<LibarayAudioSectionSkeleton />}>
        {params.then(({ id }) => (
          <LibraryAudioSlot id={id} />
        ))}
      </Suspense>
    </PrivatePageShell>
  );
}

async function LibraryHeroSlot({ id }: { id: string }) {
  "use cache";

  cacheLife("max");
  cacheTag(CACHE_TAG.LIBRARY.DETAIL(id));

  return <LibraryHeroSection libId={id} />;
}

async function LibraryAudioSlot({ id }: { id: string }) {
  "use cache";

  cacheLife("weeks");
  cacheTag(CACHE_TAG.LIBRARY.AUDIO(id));

  return <LibarayAudioSection libId={id} />;
}

type TProps = {
  params: Promise<{ id: string }>;
};
