"use client";

import { useCallback, useEffect, useState } from "react";

import { OfflineLibraries } from "#offline/repositories/libraries";
import { OfflineNomusic } from "#offline/repositories/nomusic";
import type { TLibraryOffline, TNomusicOffline } from "#offline/types";

export function useNomusicByLibId(libId?: TLibraryOffline["id"]) {
  const [nomusic, setNomusic] = useState<TNomusicOffline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!libId) {
      setNomusic([]);
      setIsLoading(false);
      return;
    }

    const libraryRes = await OfflineLibraries.getById(libId);

    if (!libraryRes.isSuccess) {
      setNomusic([]);
      setError(libraryRes.message);
      setIsLoading(false);
      return;
    }

    const library = libraryRes.data;

    if (!library) {
      setNomusic([]);
      setIsLoading(false);
      return;
    }

    const nomusicRes = await OfflineNomusic.getMany(library.nomusicIds);

    if (!nomusicRes.isSuccess) {
      setNomusic([]);
      setError(nomusicRes.message);
      setIsLoading(false);
      return;
    }

    setNomusic(nomusicRes.data);
    setIsLoading(false);
  }, [libId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    libId,
    nomusic,
    isLoading,
    error,
    refresh,
  };
}
