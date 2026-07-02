"use client";

import { useSearchParams } from "next/navigation";

import { useLibrary } from "#offline/hooks";
import { OfflineLibraryContentSkeleton } from "../elements/OfflineLibraryContentSkeleton";
import { OfflineNotFoundLibrary } from "../elements/OfflineNotFoundLibrary";
import { OfflineLibraryAudioSection } from "./OfflineLibraryAudioSection";
import { OfflineLibraryHeroSection } from "./OfflineLibraryHeroSection";

export function OfflineLibraryContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { library, isLoading } = useLibrary(id ?? undefined);

  if (isLoading) {
    return <OfflineLibraryContentSkeleton />;
  }

  if (!library) {
    return <OfflineNotFoundLibrary />;
  }

  return (
    <>
      <OfflineLibraryHeroSection library={library} />
      <OfflineLibraryAudioSection libId={library.id} />
    </>
  );
}
