"use client";

import { RiCloseLine, RiSearchLine } from "@remixicon/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { QUERY } from "#constants/private/query";

export function NomusicSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get(QUERY.SEARCH) ?? "");

  useEffect(() => {
    setValue(searchParams.get(QUERY.SEARCH) ?? "");
  }, [searchParams]);

  const updateSearchParam = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextValue) {
      params.set(QUERY.SEARCH, nextValue);
    } else {
      params.delete(QUERY.SEARCH);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleSearch = () => updateSearchParam(value);

  const handleClear = () => {
    setValue("");
    updateSearchParam("");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative min-w-0 max-w-56 w-44 sm:w-32 md:w-36 lg:w-48 xl:w-56">
        <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search title or artist" className="bg-card-secondary w-full px-4 pr-8 text-primary-200" />
        {value && (
          <Button type="button" variant="ghost" size="icon-xs" onClick={handleClear} aria-label="Clear search" className="absolute right-1 top-1/2 -translate-y-1/2 text-primary-200/70 hover:text-primary-200">
            <RiCloseLine className="size-4" />
          </Button>
        )}
      </div>
      <Button type="button" variant="outline" size="icon" aria-label="Search" onClick={handleSearch} data-ph-capture-attribute-action="audio_searched" data-ph-capture-attribute-search={value}>
        <RiSearchLine />
      </Button>
    </div>
  );
}
