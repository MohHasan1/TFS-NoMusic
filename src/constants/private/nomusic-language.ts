import { capitalizeFirstLetter } from "@/lib/utils";

export const LANGUAGES_VALUES = ["bangla", "hindi", "english", "arabic", "others"] as const;
export type TLANGUAGES_VALUES = (typeof LANGUAGES_VALUES)[number];
export const ALL_LANGUAGE_VALUE = "all" as const;

export const LANGUAGE_OPTIONS = [
  { label: "All languages", value: ALL_LANGUAGE_VALUE },
  ...LANGUAGES_VALUES.map((value) => ({
    label: capitalizeFirstLetter(value),
    value,
  })),
] as const;

export function isLanguage(value?: string | null): value is TLANGUAGES_VALUES {
  return !!value && (LANGUAGES_VALUES as readonly string[]).includes(value);
}
