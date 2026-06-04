"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#components/ui/select";
import { LANGUAGE_OPTIONS, QUERY } from "#constants/private/query";

export function NomusicQueryParamFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const language = searchParams.get(QUERY.LANGUAGE) ?? "";

  const handleLanguageChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const nextValue = value.trim();

      if (nextValue === "all") {
        params.delete(QUERY.LANGUAGE);
      } else if (nextValue) {
        params.set(QUERY.LANGUAGE, nextValue);
      } else {
        params.delete(QUERY.LANGUAGE);
      }

      const query = params.toString();
      const href = query ? `${pathname}?${query}` : pathname;

      router.replace(href, { scroll: false });
    },
    [pathname, router, searchParams],
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
