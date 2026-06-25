import type { Library } from "#payload-types";

export const LIBRARY_SECTIONS = [
  {
    type: "album",
    title: "NoMusic Albums",
    description: "Discover curated collections featuring NoMusic releases and themed drops.",
  },
  {
    type: "user",
    title: "Shared by You",
    description: "Made by you, shared from the heart, and waiting to be discovered by others.",
  },
  {
    type: "language",
    title: "Explore by Language",
    description: "Browse collections by language and discover the vocal styles you enjoy.",
  },
] as const;

export type TLibrarySection = {
  type: Library["type"];
  title: string;
  description: string;
};
