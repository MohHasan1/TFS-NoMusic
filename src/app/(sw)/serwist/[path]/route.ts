import { createSerwistRoute } from "@serwist/turbopack";

const OFFLINE_ROUTES = [
  "/offline",

  "/favicon.ico",
  "/apple-icon.png",

  "/manifest.json",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
] as const;

/*
 * Change this value whenever the offline shell changes.
 * This tells Serwist to download fresh HTML.
 */
const OFFLINE_SHELL_REVISION = "v1";

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } = createSerwistRoute(
  {
    swSrc: "src/app/sw.ts",
    useNativeEsbuild: true,

    /*
     * Do not automatically include every Next.js build asset.
     * Do not install-time precache assets from the whole application.
     */
    // globPatterns: [],

    /*
     * Precache generated Next.js application assets.
     *
     * JS    → React/Next.js client code
     * CSS   → globals.css and component styles
     * fonts → next/font output
     */
    // globPatterns: ["**/*.{js,css,woff,woff2}"],
    // Only publicly accessible Next.js browser assets.
    // globDirectory: ".next/static",
    // globPatterns: ["**/*.{js,css,woff,woff2}"],
    globPatterns: [".next/static/**/*.{js,css,woff,woff2}"],
    // todo: media/favicon, apple and fonts

    /*
     * Fetch and cache these pages when the Service Worker installs.
     */
    additionalPrecacheEntries: OFFLINE_ROUTES.map((url) => ({
      url,
      revision: OFFLINE_SHELL_REVISION,
    })),
  },
);
