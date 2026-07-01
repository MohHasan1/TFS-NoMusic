/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { OFFLINE_STORAGE } from "#offline/constants";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheOnly, NetworkOnly, RangeRequestsPlugin, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

const OFFLINE_PATH = "/offline";
function isOfflinePath(pathname: string): boolean {
  return pathname === OFFLINE_PATH || pathname.startsWith(`${OFFLINE_PATH}/`);
}

const cachedAudio = new CacheOnly({
  cacheName: OFFLINE_STORAGE.NAME,

  plugins: [
    /*
     * Converts requests such as:
     * Range: bytes=0-100000
     *
     * into a valid 206 response using the fully cached audio file.
     */
    new RangeRequestsPlugin(),
  ],
});

const cachedImage = new CacheOnly({
  cacheName: OFFLINE_STORAGE.NAME,
});

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
     * Serve downloaded songs.
     */
    {
      matcher({ request, url, sameOrigin }) {
        return (
          sameOrigin &&
          request.method === "GET" &&
          url.pathname.startsWith(`${OFFLINE_STORAGE.NOMUSIC_PATH}/`) &&
          url.pathname.endsWith("/audio")
        );
      },

      handler: cachedAudio,
    },

    /*
     * Serve downloaded song covers and library covers.
     */
    {
      matcher({ request, url, sameOrigin }) {
        const isOfflineCover =
          url.pathname.startsWith(`${OFFLINE_STORAGE.NOMUSIC_PATH}/`) ||
          url.pathname.startsWith(`${OFFLINE_STORAGE.LIBRARY_PATH}/`);

        return (
          sameOrigin &&
          request.method === "GET" &&
          isOfflineCover &&
          url.pathname.endsWith("/cover")
        );
      },

      handler: cachedImage,
    },

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
// serwist.setCatchHandler(async ({ request }) => {
//   if (request.mode !== "navigate") {
//     return Response.error();
//   }

//   const requestedURL = new URL(request.url);

//   /*
//    * Do not create an endless redirect if an unlisted
//    * /offline route is requested.
//    */
//   if (isOfflinePath(requestedURL.pathname)) {
//     return Response.error();
//   }

//   return Response.redirect(new URL(OFFLINE_PATH, self.location.origin).href, 302);
// });

function isOfflineMediaPath(pathname: string): boolean {
  return pathname.startsWith(`${OFFLINE_STORAGE.ROOT_PATH}/`);
}

serwist.setCatchHandler(async ({ request }) => {
  const requestedURL = new URL(request.url);

  /*
   * Missing downloaded audio/image.
   */
  if (isOfflineMediaPath(requestedURL.pathname)) {
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
  if (isOfflinePath(requestedURL.pathname)) {
    return Response.error();
  }

  /*
   * A network request can fail even while the browser is online,
   * such as an aborted request or temporary server failure.
   *
   * Only redirect when the browser reports that it is offline.
   */
  if (self.navigator.onLine) {
    return Response.error();
  }

  return Response.redirect(new URL(OFFLINE_PATH, self.location.origin).href, 302);
});

serwist.addEventListeners();
