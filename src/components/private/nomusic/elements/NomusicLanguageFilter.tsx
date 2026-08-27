"use client";

import { RiGlobalLine } from "@remixicon/react";
import { useRouter } from "nextjs-toploader/app";
import { useCallback } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#components/ui/select";
import { ALL_LANGUAGE_VALUE, isLanguage, LANGUAGE_OPTIONS, type TLANGUAGES_VALUES } from "#constants/private/nomusic-language";
import { PRIVATE_ROUTES } from "#constants/routes";

export function NomusicLanguageFilter({ language }: TProps) {
  const router = useRouter();

  const selectedLanguage = language ?? ALL_LANGUAGE_VALUE;

  const handleLanguageChange = useCallback(
    (value: string) => {
      const href = value !== ALL_LANGUAGE_VALUE && isLanguage(value) ? PRIVATE_ROUTES.NOMUSIC_LANGUAGE(value) : PRIVATE_ROUTES.NOMUSIC;

      router.push(href);
    },
    [router],
  );

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="bg-card-secondary w-64 min-w-0 max-w-64 overflow-hidden px-4 md:w-56 text-primary-200">
        <RiGlobalLine className="size-4 shrink-0" />
        <SelectValue className="w-full min-w-0 truncate text-center" placeholder="Language" />
      </SelectTrigger>

      <SelectContent className="bg-card-secondary backdrop-blur-md text-primary-200">
        {LANGUAGE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="cursor-pointer" data-ph-capture-attribute-action="language_filter_selected" data-ph-capture-attribute-language={option.value}>
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
