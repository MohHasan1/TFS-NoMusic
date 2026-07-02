"use client";

import { OfflineCardGridSkeleton } from "#offline/components/shared/OfflineCardGridSkeleton";
import { OfflineLibCard } from "./OfflineLibCard";
import { TLibraryOffline } from "#offline/types";
import { useLibraries } from "#offline/hooks";
import LibEmptyBox from "./LibEmptyBox";

export function OfflineLibSectionFrame({ title, description, type }: TProps) {
  const { libraries, isLoading } = useLibraries(type);

  return (
    <section className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-lg font-semibold tracking-tight text-primary-200 md:text-xl">
          {title}
        </h2>
        {description ? <p className="text-sm text-foreground/80">{description}</p> : null}
      </div>

      {isLoading && <OfflineCardGridSkeleton count={4} />}

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

export type TProps = {
  title: string;
  description: string;
  type: TLibraryOffline["type"];
};
