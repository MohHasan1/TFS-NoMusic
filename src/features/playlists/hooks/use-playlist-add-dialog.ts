"use client";

import { useStore } from "#store";

export function usePlaylistAddDialog() {
  const trackId = useStore((s) => s.playlistAddTrackId);
  const open = useStore((s) => s.openPlaylistAddDialog);
  const close = useStore((s) => s.closePlaylistAddDialog);

  return { trackId, open, close };
}
