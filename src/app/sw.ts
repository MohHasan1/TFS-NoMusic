/// <reference lib="esnext" />
/// <reference lib="webworker" />

import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { handler, matcher, path } from "#offline/service-worker";
import { Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  skipWaiting: true,
  clientsClaim: true,
  precacheEntries: self.__SW_MANIFEST,

  precacheOptions: {
    cacheName: "nomusic-offline-shell",
    cleanupOutdatedCaches: true,

    /*
     * Makes:
     * /offline?view=library&id=abc
     *
     * match the precached:
     * /offline
     */
    ignoreURLParametersMatching: [/^(view|id)$/, /^(favicon|icon|apple-icon)(\..+)?$/],
  },

  runtimeCaching: [
    /*
     * Serve downloaded songs.
     */
    {
      matcher: matcher.audio,
      handler: handler.audio,
    },

    /*
     * Serve downloaded covers.
     */
    {
      matcher: matcher.cover,
      handler: handler.cover,
    },

    /*
     * Every navigation that was not matched by the precache
     * remains network-only.
     */
    {
      matcher: matcher.navigation,
      handler: handler.navigation,
    },
  ],
});

serwist.setCatchHandler(async ({ request }) => {
  const requestedURL = new URL(request.url);

  /*
   * Missing downloaded audio/image.
   */
  if (path.isOfflineMedia(requestedURL.pathname)) {
    return new Response(null, {
      status: 404,
      statusText: "Offline media not found",
    });
  }

  /*
   * Only page navigations should redirect.
   */
  if (request.mode !== "navigate") {
    return Response.error();
  }

  /*
   * Avoid redirecting /offline to itself.
   */
  if (path.isOffline(requestedURL.pathname)) {
    const offlineResponse = await serwist.matchPrecache(path.offline);
    return offlineResponse ?? Response.error();
  }

  return Response.redirect(new URL(path.offline, self.location.origin).href, 302);
});

serwist.addEventListeners();
