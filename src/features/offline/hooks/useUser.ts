"use client";

import { useCallback, useEffect, useState } from "react";

import { OfflineUser } from "#offline/repositories/user";
import type { TUserOffline } from "#offline/types";

export function useUser() {
  const [user, setUser] = useState<TUserOffline | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const result = await OfflineUser.getAll();

    if (result.isSuccess) {
      setUser(result.data[0] ?? null);
      setError(null);
    } else {
      setUser(null);
      setError(result.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    user,
    isLoading,
    error,
    refresh,
  };
}
