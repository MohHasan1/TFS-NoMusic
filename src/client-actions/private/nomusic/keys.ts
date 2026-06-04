const NOMUSIC_KEY = "nomusic";
export const NOMUSIC_FILTER_FIELDS = ["language", "artist"] as const;

export const QUERY_KEYS = {
  nomusic: {
    list: [NOMUSIC_KEY] as const,
    infinite: (filters: TNomusicFilters = {}) => [NOMUSIC_KEY, "infinite", filters] as const,
    one: (songId: string) => [NOMUSIC_KEY, "detail", songId] as const,
  },
} as const;

export type TNomusicFilterField = (typeof NOMUSIC_FILTER_FIELDS)[number];

export type TNomusicFilters = Partial<Record<TNomusicFilterField, string | null>>;

import type { Where } from "payload";
export function buildNomusicWhere(filters: TNomusicFilters): Where | undefined {
  const and = NOMUSIC_FILTER_FIELDS.flatMap((field) => {
    const value = filters[field];

    if (!value) {
      return [];
    }

    return [
      {
        [field]: {
          equals: value,
        },
      },
    ];
  });

  return and.length > 0 ? { and } : undefined;
}
