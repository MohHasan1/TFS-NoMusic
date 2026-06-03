export const LIBRARY_TYPES = ["language", "curated"] as const;

export const LANGUAGES_VALUES = ["english", "bangla", "hindi", "arabic", "others"] as const;
export type TLANGUAGES_VALUES = (typeof LANGUAGES_VALUES)[number];

export const CURATED_VALUES = ["trending", "featured", "new"] as const;

// NOTE: Value validator const.
export const VALIDATORS = {
  language: {
    type: "language",
    values: LANGUAGES_VALUES,
  },
  curated: {
    type: "curated",
    values: CURATED_VALUES,
  },
} as const;

// TODO: test lib id
export const LIBRARY_IDS = {
  english: process.env.LIBRARY_ENGLISH_ID || "6a0a94854bc0ff07001f3166",
  bangla: process.env.LIBRARY_BANGLA_ID || "6a0a93cb4bc0ff07001f3121",
  hindi: process.env.LIBRARY_HINDI_ID || "6a0a944d4bc0ff07001f3133",
  arabic: process.env.LIBRARY_ARABIC_ID || "6a0a94604bc0ff07001f3146",
  others: process.env.LIBRARY_OTHERS_ID || "6a0a94724bc0ff07001f3156",
} as const;
