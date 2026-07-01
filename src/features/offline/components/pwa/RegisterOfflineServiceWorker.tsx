// src/components/pwa/register-offline-service-worker.tsx

"use client";

import { useEffect } from "react";

export function RegisterOfflineServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    async function registerServiceWorker() {
      try {
        await navigator.serviceWorker.register("/serwist/sw.js", {
          scope: "/offline",
          type: "module",
        });
      } catch (error) {
        console.error("Failed to register the offline service worker:", error);
      }
    }

    void registerServiceWorker();
  }, []);

  return null;
}
