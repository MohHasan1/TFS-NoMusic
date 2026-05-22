"use client";

import { store } from "#store";

export function useIsPlayerBuffering() {
  const isBuffering = store((state) => state.isBuffering);

  return { isBuffering };
}
