"use client";

import { useCallback, useEffect, useState } from "react";

import { OfflineLibraries } from "#offline/repositories/libraries";
import type { TLibraryOffline } from "#offline/types";
import type { TLibrary } from "#types/library";

export function useLibraries(type?: TLibrary["type"], limit?: number) {
  const [libraries, setLibraries] = useState<TLibraryOffline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await OfflineLibraries.getAll(limit);

    if (result.isSuccess) {
      setLibraries(type ? result.data.filter((library) => library.type === type) : result.data);
      setError(null);
    } else {
      setLibraries([]);
      setError(result.message);
    }

    setIsLoading(false);
  }, [type, limit]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    libraries,
    type,
    isLoading,
    error,
    refresh,
  };
}
