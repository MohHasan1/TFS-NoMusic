export const LIBRARY_TYPES = ["language", "curated"] as const;

export const LANGUAGES_VALUES = ["english", "bangla", "hindi", "arabic", "others"] as const;
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
