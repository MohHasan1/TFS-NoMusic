"use client";

import { useCallback, useEffect, useState } from "react";

import { OfflineLibraries } from "#offline/repositories/libraries";
import type { TLibraryOffline } from "#offline/types";

export function useLibrary(id?: TLibraryOffline["id"]) {
  const [library, setLibrary] = useState<TLibraryOffline | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!id) {
      setLibrary(null);
      setIsLoading(false);
      return;
    }

    const result = await OfflineLibraries.getById(id);

    if (result.isSuccess) {
      setLibrary(result.data ?? null);
      setError(null);
    } else {
      setLibrary(null);
      setError(result.message);
    }

    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    library,
    id,
    isLoading,
    error,
    refresh,
  };
}
