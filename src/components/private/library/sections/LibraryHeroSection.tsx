import { RiMusic2Line } from "@remixicon/react";

import type { TLibraryDetail } from "../constants/libraryDetails";
import { LibraryCover } from "../elements/LibraryCover";

export function LibraryHeroSection({ library }: TProps) {
  const noMusicLabel = `${library.trackCount} NoMusic`;

  return (
    <section className="relative">
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-center lg:gap-8">
        <LibraryCover src={library.coverImage} alt={`${library.name} cover`} />

        <div className="space-y-4 lg:space-y-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white/95 sm:text-4xl lg:text-5xl">
              {library.name}
            </h1>

            <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
              {library.description}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-white/60">
            <RiMusic2Line className="size-4 shrink-0 text-primary-400" />
            <span className="font-medium">{noMusicLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

type TProps = {
  library: TLibraryDetail;
};
