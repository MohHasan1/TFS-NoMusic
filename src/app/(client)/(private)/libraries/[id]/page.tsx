
import { notFound } from "next/navigation";

import {
  getLibraryDetail,
  LIBRARY_DETAILS,
} from "#components/private/library/constants/libraryDetails";
import { LibraryHeroSection } from "#components/private/library/sections/LibraryHeroSection";
import { LibraryTracksSection } from "#components/private/library/sections/LibraryTracksSection";

export function generateStaticParams() {
  return LIBRARY_DETAILS.map((library) => ({ id: library.id }));
}

export default async function LibraryPage({ params }: TProps) {
  const { id } = await params;
  const library = getLibraryDetail(id);

  if (!library) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pt-24 pb-32 lg:px-8">
      <LibraryHeroSection library={library} />
      <LibraryTracksSection tracks={library.tracks} />
    </div>
  );
}

type TProps = {
  params: Promise<{ id: string }>;
};
