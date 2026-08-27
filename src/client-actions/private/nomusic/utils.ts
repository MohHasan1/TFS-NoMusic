import type { Where } from "payload";
import { NOMUSIC_FILTER_FIELDS, type TNomusicFilters } from "./keys";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildNomusicWhere(filters: TNomusicFilters): Where | undefined {
  const and: Where[] = NOMUSIC_FILTER_FIELDS.flatMap((field) => {
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

  if (filters.search) {
    // Contains-anywhere match (not anchored) — see docs/project/NOMUSIC_SEARCH.md
    // for why this means the name/artist indexes go unused.
    const pattern = escapeRegExp(filters.search);

    and.push({
      or: [{ name: { like: pattern } }, { artist: { like: pattern } }],
    });
  }

  return and.length > 0 ? { and } : undefined;
}
