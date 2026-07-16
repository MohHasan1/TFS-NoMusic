"use client";

import { OFFLINE_ROUTES } from "#constants/routes";
import { OfflineHomeLibRowSkeleton } from "../elements/OfflineHomeLibRowSkeleton";
import { OfflineHomeSectionHeader } from "../elements/OfflineHomeSectionHeader";
import { OfflineLibRowCard } from "../elements/OfflineLibRowCard";
import { useLibraries } from "#offline/hooks";

const RECENT_COUNT = 4;

export default function OfflineHomeRecentLibrariesSection() {
  const { libraries: recent, isLoading } = useLibraries(undefined, RECENT_COUNT);

  if (isLoading) {
    return (
      <section className="space-y-4">
        <OfflineHomeSectionHeader
          title="Recently Added Libraries"
          href={OFFLINE_ROUTES.LIBRARIES}
          linkLabel="View Libraries"
        />

        <div className="space-y-3">
          {Array.from({ length: RECENT_COUNT }, (_, index) => (
            <OfflineHomeLibRowSkeleton key={`lib-skeleton-${index + 1}`} />
          ))}
        </div>
      </section>
    );
  }

  if (recent.length === 0) return null;

  return (
    <section className="space-y-4">
      <OfflineHomeSectionHeader
        title="Recently Added Libraries"
        href={OFFLINE_ROUTES.LIBRARIES}
        linkLabel="View Libraries"
      />

      <div className="space-y-3">
        {recent.map((library) => (
          <OfflineLibRowCard key={library.id} library={library} />
        ))}
      </div>
    </section>
  );
}
