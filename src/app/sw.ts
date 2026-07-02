/// <reference lib="esnext" />
/// <reference lib="webworker" />

import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { CacheOnly, NetworkOnly, RangeRequestsPlugin, Serwist } from "serwist";
import { OFFLINE_STORAGE } from "#offline/constants";

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
    cacheName: "nomusic-offline-shell",
    cleanupOutdatedCaches: true,

    /*
     * Makes:
     * /offline?view=library&id=abc
     *
     * match the precached:
     * /offline
     */
    ignoreURLParametersMatching: [/^(view|id)$/],
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


function isOfflineMediaPath(pathname: string): boolean {
  return pathname.startsWith(`${OFFLINE_STORAGE.ROOT_PATH}/`);
}


serwist.setCatchHandler(async ({ request }) => {
  const requestedURL = new URL(request.url);
  console.log("requestedURL",requestedURL)

  /*
   * Missing downloaded audio/image.
   */
  if (isOfflineMediaPath(requestedURL.pathname)) {
    return new Response(null, {
      status: 404,
      statusText: "Offline media not found",
    });
  }
  console.log("Passed Missing downloaded audio/image.")

  /*
   * Only page navigations should redirect.
   */
  if (request.mode !== "navigate") {
    return Response.error();
  }
  console.log("Passed Only page navigations should redirect.")

  /*
   * Avoid redirecting /offline to itself.
   */
  if (isOfflinePath(requestedURL.pathname)) {
    // return Response.error();
    const offlineResponse = await serwist.matchPrecache(OFFLINE_PATH);

    return offlineResponse ?? Response.error();
  }
  console.log("Passed Avoid redirecting /offline to itself.")

  /*
   * A network request can fail even while the browser is online,
   * such as an aborted request or temporary server failure.
   *
   * Only redirect when the browser reports that it is offline.
   */
  // if (self.navigator.onLine) {
  //   return Response.error();
  // }
  console.log("Passed self.navigator.onLine.")


  return Response.redirect(new URL(OFFLINE_PATH, self.location.origin).href, 302);
});

serwist.addEventListeners();
