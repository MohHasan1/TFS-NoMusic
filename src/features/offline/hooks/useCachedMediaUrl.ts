"use client";

import { useEffect, useState } from "react";

import { OFFLINE_STORAGE } from "#offline/constants";
import { MediaRepo } from "#offline/repositories/media";

export function useCachedMediaUrl(src?: string | null) {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    let objectUrl: string | null = null;

    setError(null);

    if (!src) {
      setUrl(null);
      setIsLoading(false);
      return;
    }

    if (!isOfflineCacheKey(src)) {
      setUrl(src);
      setIsLoading(false);
      return;
    }

    setUrl(null);
    setIsLoading(true);

    void (async () => {
      const result = await MediaRepo.getBlob(src);

      if (!isActive) return;

      if (!result.isSuccess) {
        setUrl(null);
        setError(result.message);
        setIsLoading(false);
        return;
      }

      if (!result.data) {
        setUrl(null);
        setIsLoading(false);
        return;
      }

      objectUrl = URL.createObjectURL(result.data);
      setUrl(objectUrl);
      setIsLoading(false);
    })();

    return () => {
      isActive = false;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  return {
    url,
    isLoading,
    error,
  };
}

function isOfflineCacheKey(src: string) {
  return src.startsWith(OFFLINE_STORAGE.ROOT_PATH);
}
