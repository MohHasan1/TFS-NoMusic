import { LANGUAGES_VALUES } from "@/collections/constants/libraries";
import { capitalizeFirstLetter } from "@/collections/helpers/format";

export const QUERY = {
  LANGUAGE: "language",
};

export const LANGUAGE_OPTIONS = [
  { label: "All languages", value: "all" },
  ...LANGUAGES_VALUES.map((value) => ({
    label: capitalizeFirstLetter(value),
    value,
  })),
] as const;