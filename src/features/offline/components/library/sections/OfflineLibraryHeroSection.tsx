"use client";

import { RiMusic2Line, RiUser3Line } from "@remixicon/react";

import { OfflineLibraryRemoveButton } from "#offline/components/library/elements/OfflineLibraryRemoveButton";
import { LibraryCover } from "#components/private/library/elements/LibraryCover";
import { OfflineImage } from "#features/offline/components/shared/OfflineImage";
import type { TLibraryOffline } from "#offline/types";

export function OfflineLibraryHeroSection({ library }: TProps) {
  const trackCount = library.trackCount;
  const count = trackCount ? (trackCount > 50 ? 50 : trackCount) : 0;
  const trackLabel = `${count} NoMusic`;
  const libAuthor = library.author || "NoMusic";

  return (
    <section className="relative">
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-center lg:gap-8">
        <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-white/8 bg-card-secondary shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--primary-600)_55%,transparent)]">
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-br from-primary-400/10 via-transparent to-primary-600/12" />

          <OfflineImage
            src={library.uploadedImageURL}
            alt={`${library.name} cover`}
            className="object-cover"
            fallback={<LibraryCover alt={`${library.name} cover`} name={library.name} />}
          />
        </div>

        <div className="space-y-4 space-x-4 lg:space-y-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white/95 sm:text-4xl lg:text-5xl">
              {library.name}
            </h1>

            <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
              {library.description || "Private library collection."}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <RiMusic2Line className="size-4 shrink-0 text-primary-400" />
            <span className="font-medium">{trackLabel}</span>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <RiUser3Line className="size-4 shrink-0 text-primary-400" />
            <span className="font-medium">{libAuthor}</span>
          </div>

          <OfflineLibraryRemoveButton library={library} />
        </div>
      </div>
    </section>
  );
}

type TProps = {
  library: TLibraryOffline;
};
