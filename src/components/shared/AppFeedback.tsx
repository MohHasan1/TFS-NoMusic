"use client";

import type { CSSProperties } from "react";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

const toastStyle = {
  "--normal-bg": "var(--card-secondary)",
  "--normal-text": "var(--card-foreground)",
  "--normal-border": "color-mix(in oklab, var(--primary-400) 20%, transparent)",
} as CSSProperties;

export function AppFeedback() {
  return (
    <>
      <NextTopLoader
        easing="cubic-bezier(0.22, 1, 0.36, 1)"
        showSpinner={false}
        crawlSpeed={500}
        speed={180}
        height={3}
        color="linear-gradient(90deg, var(--primary-600) 0%, var(--primary-200) 45%, var(--primary-400) 100%)"
      />
      <Toaster
        position="top-left"
        toastOptions={{
          classNames: {
            toast:
              "border border-primary-400/20 bg-card-secondary text-card-foreground backdrop-blur-xl",
          },
        }}
        style={toastStyle}
      />
    </>
  );
}
