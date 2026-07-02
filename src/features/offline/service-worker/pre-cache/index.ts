/*
 * Change this value whenever the offline shell changes.
 * This tells Serwist to download fresh HTML.
 */
const shellRevision = "v1";

const offlinePages = ["/offline"] as const;
const appMetadataAssets = [
  "/favicon.ico",
  "/apple-icon.png",
  "/manifest.json",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
] as const;

const urls = [...offlinePages, ...appMetadataAssets];

const globPatterns = [".next/static/**/*.{js,css,woff,woff2}"];

const entries = urls.map((url) => ({
  url,
  revision: shellRevision,
}));

export const preCache = {
  entries,
  globPatterns,
};
