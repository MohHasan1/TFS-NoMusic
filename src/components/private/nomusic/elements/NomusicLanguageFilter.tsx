"use client";

import { useCallback } from "react";
import { useRouter } from "nextjs-toploader/app";

import { PRIVATE_ROUTES } from "#constants/routes";
import {
  ALL_LANGUAGE_VALUE,
  isLanguage,
  LANGUAGE_OPTIONS,
  TLANGUAGES_VALUES,
} from "#constants/private/nomusic-language";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select";

export function NomusicLanguageFilter({ language }: TProps) {
  const router = useRouter();

  const selectedLanguage = language ?? ALL_LANGUAGE_VALUE;

  const handleLanguageChange = useCallback(
    (value: string) => {
      const href =
        value !== ALL_LANGUAGE_VALUE && isLanguage(value)
          ? PRIVATE_ROUTES.NOMUSIC_LANGUAGE(value)
          : PRIVATE_ROUTES.NOMUSIC;

      router.push(href);
    },
    [router],
  );

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="bg-card-secondary w-60 justify-center md:w-52 text-primary-200">
        <SelectValue className="w-full text-center" placeholder="Language" />
      </SelectTrigger>

      <SelectContent className="bg-card-secondary backdrop-blur-md text-primary-200">
        {LANGUAGE_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer"
            data-ph-capture-attribute-action="language_filter_selected"
            data-ph-capture-attribute-language={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type TProps = {
  language?: TLANGUAGES_VALUES;
};
