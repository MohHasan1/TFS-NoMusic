import type { Library } from "#payload-types";

export const LIBRARY_SECTIONS: readonly TLibrarySection[] = [
  {
    type: "album",
    title: "NoMusic Albums",
    description: "Curated album-style collections for featured NoMusic releases and themed drops.",
  },
  {
    type: "user",
    title: "User Shared Libraries",
    description:
      "Personal collections built by your users, ready for saved mixes, references, and custom vocal groupings.",
  },
  {
    type: "language",
    title: "Explore by Language",
    description: "Browse collections by language and jump straight into the vocal styles you want.",
  },
] as const;

export type TLibrarySection = {
  type: Library["type"];
  title: string;
  description: string;
};
