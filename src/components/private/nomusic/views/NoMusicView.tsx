import { Suspense } from "react";

import { NoMusicLanguageFilterSection } from "../sections/NoMusicLanguageFilterSection";
import { PrivatePageShell } from "#components/private/shared/PrivatePageShell";
import type { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { NoMusicGridSkeleton } from "../elements/NoMusicGridSkeleton";
import NoMusicContentSection from "../sections/noMusicContentSection";
import NoMusicHeaderSection from "../sections/NoMusicHeaderSection";

export function NoMusicView({ language }: TProps) {
  return (
    <PrivatePageShell className="pb-60">
      <NoMusicHeaderSection language={language} />
      <NoMusicLanguageFilterSection language={language} />
      <Suspense fallback={<NoMusicGridSkeleton />}>
        <NoMusicContentSection language={language} />
      </Suspense>
    </PrivatePageShell>
  );
}

type TProps = {
  language?: TLANGUAGES_VALUES;
};
