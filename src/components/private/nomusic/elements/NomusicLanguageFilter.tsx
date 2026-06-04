"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select";
import { isLanguage, LANGUAGE_OPTIONS } from "#constants/private/nomusic-language";
import { QUERY } from "#constants/private/query";

export function NomusicLanguageFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawLanguage = searchParams.get(QUERY.LANGUAGE);
  const language = rawLanguage && isLanguage(rawLanguage) ? rawLanguage : "all";
  const searchParamsString = searchParams.toString();

  useEffect(() => {
    if (!rawLanguage) return;
    if (isLanguage(rawLanguage)) return;

    const params = new URLSearchParams(searchParamsString);
    params.delete(QUERY.LANGUAGE);

    const query = params.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    router.replace(href, { scroll: false });
  }, [rawLanguage, pathname, router, searchParamsString]);

  const handleLanguageChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParamsString);

      if (value === "all") {
        params.delete(QUERY.LANGUAGE);
      } else if (isLanguage(value)) {
        params.set(QUERY.LANGUAGE, value);
      } else {
        params.delete(QUERY.LANGUAGE);
      }

      const query = params.toString();
      const href = query ? `${pathname}?${query}` : pathname;

      router.replace(href, { scroll: false });
    },
    [pathname, router, searchParamsString],
  );

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-full md:w-52 bg-card-secondary">
        <SelectValue placeholder="Language" />
      </SelectTrigger>

      <SelectContent className="bg-card-secondary">
        {LANGUAGE_OPTIONS.map((option) => (
          <SelectItem key={option.value || "all"} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
