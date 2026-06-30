"use client";

import { useCallback, useEffect, useState } from "react";

import { OfflineLibraries } from "#offline/repositories/libraries";
import type { TLibraryOffline } from "#offline/types";

export function useLibraries() {
  const [libraries, setLibraries] = useState<TLibraryOffline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await OfflineLibraries.getAll();

    if (result.isSuccess) {
      setLibraries(result.data);
      setError(null);
    } else {
      setLibraries([]);
      setError(result.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    libraries,
    isLoading,
    error,
    refresh,
  };
}
