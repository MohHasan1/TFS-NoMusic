"use client";

import { useCallback, useEffect, useState } from "react";

import { OfflineNomusic } from "#offline/repositories/nomusic";
import type { TNomusicOffline } from "#offline/types";

export function useNomusic(limit?: number) {
  const [nomusic, setNomusic] = useState<TNomusicOffline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await OfflineNomusic.getAll(limit);

    if (result.isSuccess) {
      setNomusic(result.data);
      setError(null);
    } else {
      setNomusic([]);
      setError(result.message);
    }

    setIsLoading(false);
  }, [limit]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    nomusic,
    isLoading,
    error,
    refresh,
  };
}
