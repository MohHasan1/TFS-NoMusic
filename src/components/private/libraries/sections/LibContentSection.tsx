import { LibSectionFrame } from "../elements/LibSectionFrame";
import { LIBRARY_SECTIONS } from "../constants/librarySections";

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

const exploreByLanguageCards = [
  {
    name: "Arabic Collection",
    description: "Language-driven library card for regional browsing.",
    trackCount: 12,
  },
  {
    name: "English Collection",
    description: "Use this style for language shelves and quick entry points.",
    trackCount: 8,
  },
  {
    name: "Urdu Collection",
    description: "Black, minimal, and separate from the NoMusic card style.",
    trackCount: 6,
  },
] as const;

const noMusicAlbumCards = [
  {
    name: "Late Night Vocals",
    description: "Album-style grouping with a stronger editorial feel.",
    trackCount: 14,
  },
  {
    name: "Warmup Session",
    description: "Reusable card placeholder for curated album drops.",
    trackCount: 9,
  },
  {
    name: "Studio Cuts",
    description: "Same card system, different data source later.",
    trackCount: 11,
  },
] as const;

const userLibraryCards = [
  {
    name: "Mohammed's Picks",
    description: "Custom user-made library placeholder.",
    trackCount: 7,
  },
  {
    name: "Choir References",
    description: "Use these cards for personal collections later.",
    trackCount: 5,
  },
  {
    name: "Mix Notes",
    description: "User-generated library area with the same visual system.",
    trackCount: 10,
  },
] as const;
