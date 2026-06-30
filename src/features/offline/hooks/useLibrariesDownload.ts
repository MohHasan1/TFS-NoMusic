"use client";

import { useCallback, useState } from "react";

import { LibrariesDownloadService } from "#offline/services/libraries-download";
import type { TLibrary } from "#types/library";
import type { TNoMusic } from "#types/nomusic";

export function useLibrariesDownload() {
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isPending = useCallback(
    (id: TLibrary["id"]) => pendingIds.includes(String(id)),
    [pendingIds],
  );

  const download = useCallback(async (library: TLibrary, nomusic: TNoMusic[]) => {
    const id = String(library.id);

    setPendingIds((current) => addPendingId(current, id));
    setError(null);

    try {
      const result = await LibrariesDownloadService.download(library, nomusic);

      if (!result.isSuccess) {
        setError(result.message);
      }

      return result;
    } finally {
      setPendingIds((current) => removePendingId(current, id));
    }
  }, []);

  const remove = useCallback(async (id: TLibrary["id"]) => {
    const itemId = String(id);

    setPendingIds((current) => addPendingId(current, itemId));
    setError(null);

    try {
      const result = await LibrariesDownloadService.remove(id);

      if (!result.isSuccess) {
        setError(result.message);
      }

      return result;
    } finally {
      setPendingIds((current) => removePendingId(current, itemId));
    }
  }, []);

  return {
    pendingIds,
    error,
    isPending,
    download,
    remove,
  };
}

function addPendingId(ids: string[], id: string) {
  return ids.includes(id) ? ids : [...ids, id];
}

function removePendingId(ids: string[], id: string) {
  return ids.filter((currentId) => currentId !== id);
}
