/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheableResponsePlugin, NetworkFirst, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  /*
   * Serwist automatically injects Next.js build assets here:
   * JavaScript chunks, CSS files, fonts and other static files.
   */
  precacheEntries: self.__SW_MANIFEST,

  // Activate the new worker immediately.
  skipWaiting: true,
  // Let the worker control already-open NoMusic pages.
  clientsClaim: true,

  runtimeCaching: [
    {
      /*
       * Cache document navigations only for:
       *
       * /offline
       * /offline/*
       */
      matcher({ request, url, sameOrigin }) {
        const isOfflineRoute = url.pathname === "/offline" || url.pathname.startsWith("/offline/");
        return sameOrigin && request.mode === "navigate" && isOfflineRoute;
      },

      handler: new NetworkFirst({
        cacheName: "nomusic-offline-shell-v1",

        // Handles Next.js CSS, JS and other required assets.
        ...defaultCache,

        /*
         * Wait briefly for the latest online page.
         * If the network fails, return the cached page.
         */
        networkTimeoutSeconds: 3,

        plugins: [
          new CacheableResponsePlugin({
            // Never cache redirects, 404s or server errors.
            statuses: [200],
          }),
        ],
      }),
    },
  ],
});

serwist.addEventListeners();
