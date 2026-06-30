"use client";

import type { TLibrarySection } from "#components/private/libraries/constants/librarySections";
import { OfflineLibCard } from "./OfflineLibCard";
import { useLibraries } from "#offline/hooks";
import LibEmptyBox from "./LibEmptyBox";

export function OfflineLibSectionFrame({ title, description, type }: TProps) {
  const { libraries } = useLibraries(type);

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-white/90 md:text-xl">{title}</h2>
        {description ? <p className="text-sm text-white/55">{description}</p> : null}
      </div>

      {libraries.length === 0 ? (
        <LibEmptyBox />
      ) : (
        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {libraries.map((library) => (
            <OfflineLibCard key={library.id} library={library} />
          ))}
        </div>
      )}
    </section>
  );
}

type TProps = TLibrarySection;
