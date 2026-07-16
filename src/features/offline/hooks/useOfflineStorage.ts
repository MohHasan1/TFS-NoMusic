"use client";

import { useCallback, useEffect, useState } from "react";

export function useOfflineStorage() {
  const [usage, setUsage] = useState(0);
  const [quota, setQuota] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.storage?.estimate) {
      setIsSupported(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const estimate = await navigator.storage.estimate();

    setUsage(estimate.usage ?? 0);
    setQuota(estimate.quota ?? 0);
    setIsSupported(true);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const percentage = quota > 0 ? Math.min(100, Math.round((usage / quota) * 100)) : 0;

  return {
    usage,
    quota,
    available: Math.max(quota - usage, 0),
    percentage,
    isSupported,
    isLoading,
    refresh,
  };
}
