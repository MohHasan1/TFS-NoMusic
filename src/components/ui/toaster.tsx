"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  // Manual smoke test: uncomment temporarily to verify Sonner renders.
  // Import `toast` from "sonner", then call toast.success("Sonner works").

  return (
    <SonnerToaster
      theme="dark"
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "group-[.toaster]:bg-card group-[.toaster]:text-card-foreground group-[.toaster]:border-border",
        },
      }}
    />
  );
}
