"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { QUERY } from "#constants/private/query";
import {
  ALL_LANGUAGE_VALUE,
  isLanguage,
  LANGUAGE_OPTIONS,
} from "#constants/private/nomusic-language";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select";

export function NomusicLanguageFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchParamsString = searchParams.toString();
  const rawLanguage = searchParams.get(QUERY.LANGUAGE);

  const language = rawLanguage && isLanguage(rawLanguage) ? rawLanguage : ALL_LANGUAGE_VALUE;

  const [selectedLanguage, setSelectedLanguage] = useState<string>(language);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  // To remove
  useEffect(() => {
    if (!rawLanguage) return;
    if (isLanguage(rawLanguage)) return;

    const params = new URLSearchParams(searchParamsString);
    params.delete(QUERY.LANGUAGE);

    const query = params.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    window.history.replaceState(null, "", href);
  }, [rawLanguage, pathname, searchParamsString]);

  const handleLanguageChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParamsString);

      if (value === ALL_LANGUAGE_VALUE) {
        params.delete(QUERY.LANGUAGE);
        setSelectedLanguage(ALL_LANGUAGE_VALUE);
      } else if (isLanguage(value)) {
        params.set(QUERY.LANGUAGE, value);
        setSelectedLanguage(value);
      } else {
        params.delete(QUERY.LANGUAGE);
        setSelectedLanguage(ALL_LANGUAGE_VALUE);
      }

      const query = params.toString();
      const href = query ? `${pathname}?${query}` : pathname;

      window.history.replaceState(null, "", href);
    },
    [pathname, searchParamsString],
  );

  return (
    <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="bg-card-secondary w-60 justify-center md:w-52 text-primary-200">
        <SelectValue className="w-full text-center" placeholder="Language" />
      </SelectTrigger>

      <SelectContent className="bg-card-secondary backdrop-blur-md text-primary-200">
        {LANGUAGE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="cursor-pointer">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
