import { TNomusicFilters, NOMUSIC_FILTER_FIELDS } from "./keys";
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


export function isNomusicFilters(filters: TNomusicFilters) {
  return Object.values(filters).some(Boolean);
}
