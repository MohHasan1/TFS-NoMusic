"use client";

import { RiArrowRightLine } from "@remixicon/react";

import { OFFLINE_ROUTES } from "#constants/routes";
import { OfflineCardGridSkeleton } from "#offline/components/shared/OfflineCardGridSkeleton";
import { OfflineLink } from "#offline/components/shared/OfflineLink";
import { OfflineLibCard } from "../../libraries/elements/OfflineLibCard";
import { useLibraries } from "#offline/hooks";

const RECENT_COUNT = 4;

export default function OfflineHomeRecentLibrariesSection() {
  const { libraries: recent, isLoading } = useLibraries(undefined, RECENT_COUNT);

  if (isLoading) return <OfflineCardGridSkeleton count={RECENT_COUNT} />;
  if (recent.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary-200">Recently Added Libraries</h2>

        <OfflineLink
          href={OFFLINE_ROUTES.LIBRARIES}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary-400 hover:text-primary-300"
        >
          View all
          <RiArrowRightLine className="size-3.5" />
        </OfflineLink>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {recent.map((library) => (
          <OfflineLibCard key={library.id} library={library} />
        ))}
      </div>
    </section>
  );
}
