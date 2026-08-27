import { Suspense } from "react";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";
import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { NoMusicGridSkeleton } from "../elements/NoMusicGridSkeleton";
import { NoMusicFiltersSection } from "../sections/NoMusicFiltersSection";
import NoMusicHeaderSection from "../sections/NoMusicHeaderSection";
import NoMusicContentSection from "../sections/noMusicContentSection";

export function NoMusicView({ language }: TProps) {
  return (
    <PrivatePageShell className="pb-60">
      <NoMusicHeaderSection language={language} />
      <NoMusicFiltersSection language={language} />
      <Suspense fallback={<NoMusicGridSkeleton />}>
        <NoMusicContentSection language={language} />
      </Suspense>
    </PrivatePageShell>
  );
}

type TProps = {
  language?: TLANGUAGES_VALUES;
};
