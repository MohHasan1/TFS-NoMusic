import { LIBRARY_DETAILS } from "#components/private/library/constants/libraryDetails";

import { LibSectionFrame } from "../elements/LibSectionFrame";
import { LIBRARY_SECTIONS } from "../constants/librarySections";

const exploreByLanguageCards = LIBRARY_DETAILS.filter(
  (library) => library.section === "exploreByLanguage",
);
const noMusicAlbumCards = LIBRARY_DETAILS.filter((library) => library.section === "noMusicAlbums");
const userLibraryCards = LIBRARY_DETAILS.filter((library) => library.section === "userLibraries");

export default function LibContentSection() {
  return (
    <div className="space-y-10">
      <LibSectionFrame
        title={LIBRARY_SECTIONS.exploreByLanguage.title}
        description={LIBRARY_SECTIONS.exploreByLanguage.description}
        cards={exploreByLanguageCards}
      />
      <LibSectionFrame
        title={LIBRARY_SECTIONS.noMusicAlbums.title}
        description={LIBRARY_SECTIONS.noMusicAlbums.description}
        cards={noMusicAlbumCards}
      />
      <LibSectionFrame
        title={LIBRARY_SECTIONS.userLibraries.title}
        description={LIBRARY_SECTIONS.userLibraries.description}
        cards={userLibraryCards}
      />
    </div>
  );
}
