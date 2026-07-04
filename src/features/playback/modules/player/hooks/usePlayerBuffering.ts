"use client";

import { store } from "#store";

// NOTE: Will cause component re-render everytime a track changes:
export function usePlayerBuffering() {
  const isBuffering = store.use.isBuffering();

  return { isBuffering };
}
