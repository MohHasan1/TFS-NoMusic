import { createSerwistRoute } from "@serwist/turbopack";

const OFFLINE_ROUTES = [
  "/offline",
  "/offline/libraries",
  "/offline/nomusic",
  "/offline/libraries/id",

  "/manifest.json",
  "web-app-manifest-192x192.png",
  "web-app-manifest-512x512.png",
] as const;

// web-app-manifest-192x192.png
/*
 * Change this value whenever the offline shell changes.
 * This tells Serwist to download fresh HTML.
 */
const OFFLINE_SHELL_REVISION = "offline-shell-v1";

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute(
  {
    swSrc: "src/app/sw.ts",
    useNativeEsbuild: true,

    /*
     * Do not automatically include every Next.js build asset.
     * Do not install-time precache assets from the whole application.
     */
    globPatterns: [],

    /*
     * Fetch and cache these pages when the Service Worker installs.
     */
    additionalPrecacheEntries: OFFLINE_ROUTES.map((url) => ({
      url,
      revision: OFFLINE_SHELL_REVISION,
    })),
  },
);
