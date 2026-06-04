import type { Payload } from "payload";

import { LIBRARY_IDS } from "../constants/libraries";
import { TLANGUAGES_VALUES } from "#constants/private/nomusic-language";

const libraryCache = new Map<string, string>();

export async function getLibraryIdByLanguage(payload: Payload, language: TLANGUAGES_VALUES) {
  // 1. memory cache
  const cached = libraryCache.get(language);

  if (cached) {
    return cached;
  }

  // 2. env/constants fallback
  const libraryId = LIBRARY_IDS[language];
  console.log(libraryId);

  if (libraryId) {
    libraryCache.set(language, libraryId);

    return libraryId;
  }

  // 3. db fallback
  const result = await payload.find({
    collection: "libraries",
    limit: 1,
    depth: 0,
    pagination: false,
    select: {
      name: true,
    },
    where: {
      type: {
        equals: "language",
      },

      languageValue: {
        equals: language,
      },
    },
  });

  const library = result.docs[0];

  if (!library) {
    throw new Error(`Library not found for language: ${language}`);
  }

  // cache db result
  libraryCache.set(language, library.id);

  return library.id;
}
