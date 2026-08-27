import type { Where } from "payload";
import { NOMUSIC_FILTER_FIELDS, type TNomusicFilters } from "./keys";

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
    and.push({
      name: {
        like: filters.search,
      },
    });
  }

  return and.length > 0 ? { and } : undefined;
}
