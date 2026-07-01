/// <reference lib="esnext" />
/// <reference lib="webworker" />

// import { defaultCache } from "@serwist/turbopack/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { NetworkOnly, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

const OFFLINE_PATH = "/offline";
function isOfflinePath(pathname: string): boolean {
  return pathname === OFFLINE_PATH || pathname.startsWith(`${OFFLINE_PATH}/`);
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  /*
   * Serwist automatically injects Next.js build assets here:
   * JavaScript chunks, CSS files, fonts and other static files.
   */
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,

  precacheOptions: {
    cleanupOutdatedCaches: true,

    /*
     * Makes:
     * /offline/libraries/id?id=abc
     *
     * match the precached:
     * /offline/libraries/id
     */
    ignoreURLParametersMatching: [/^id$/],
  },

  runtimeCaching: [
    /*
     * Every navigation that was not matched by the precache
     * remains network-only.
     */
    {
      matcher({ request, sameOrigin }) {
        return sameOrigin && request.mode === "navigate";
      },

      handler: new NetworkOnly(),
    },
  ],
});

// Handles offline navigation
serwist.setCatchHandler(async ({ request }) => {
  if (request.mode !== "navigate") {
    return Response.error();
  }

  const requestedURL = new URL(request.url);

  /*
   * Do not create an endless redirect if an unlisted
   * /offline route is requested.
   */
  if (isOfflinePath(requestedURL.pathname)) {
    return Response.error();
  }

  return Response.redirect(new URL(OFFLINE_PATH, self.location.origin).href, 302);
});

serwist.addEventListeners();
