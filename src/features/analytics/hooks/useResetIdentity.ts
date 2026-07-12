"use client";

import { useCallback } from "react";
import posthog from "posthog-js";

export function useResetIdentity() {
  const resetIdentity = useCallback(() => posthog.reset(), []);

  return { resetIdentity };
}
