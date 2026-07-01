/// <reference lib="esnext" />
/// <reference lib="webworker" />

import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist } from "serwist";

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
});

serwist.addEventListeners();
