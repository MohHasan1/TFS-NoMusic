import { version } from "../../../../../package.json";

/*
 * Tied to the app version so it changes on every release, telling
 * Serwist to download fresh HTML. The offline shell HTML references the
 * current build's JS/CSS chunk hashes, which change on every release
 * regardless of whether the offline feature itself was touched — see
 * docs/project/OFFLINE_CACHING.md.
 */
const shellRevision = version;

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
