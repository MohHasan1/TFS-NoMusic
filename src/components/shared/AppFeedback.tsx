"use client";

import NextTopLoader from "nextjs-toploader";
import type { CSSProperties } from "react";
import { Toaster } from "#components/ui/sonner";

const toastStyle = {
  "--normal-text": "var(--primary-200)",
  "--normal-border": "color-mix(in oklab, var(--primary-400) 20%, transparent)",
} as CSSProperties;

export function AppFeedback() {
  return (
    <>
      <NextTopLoader easing="cubic-bezier(0.22, 1, 0.36, 1)" showSpinner={false} crawlSpeed={500} speed={180} height={3} color="linear-gradient(90deg, var(--primary-600) 0%, var(--primary-200) 45%, var(--primary-400) 100%)" />
      <Toaster position="top-center" style={toastStyle} />
    </>
  );
}
