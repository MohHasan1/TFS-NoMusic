"use client";

import { useCallback, useState } from "react";

import { NomusicDownloadService } from "#offline/services/nomusic-download";
import type { TNoMusic } from "#types/nomusic";

export function useNomusicDownload() {
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const isPending = useCallback(
    (id: TNoMusic["id"]) => pendingIds.includes(String(id)),
    [pendingIds],
  );

  const download = useCallback(async (nomusic: TNoMusic) => {
    const id = String(nomusic.id);

    setPendingIds((current) => addPendingId(current, id));
    setError(null);

    try {
      const result = await NomusicDownloadService.download(nomusic);
      if (!result.isSuccess) {
        setError(result.message);
      }

      return result;
    } finally {
      setPendingIds((current) => removePendingId(current, id));
    }
  }, []);

  const remove = useCallback(async (id: TNoMusic["id"]) => {
    const itemId = String(id);

    setPendingIds((current) => addPendingId(current, itemId));
    setError(null);

    try {
      const result = await NomusicDownloadService.remove(id);

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
