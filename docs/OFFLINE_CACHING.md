# Offline Shell Caching

This document explains how the offline shell (`/offline`) is cached by the
service worker, and the deploy step required to keep it working.

## How it works

The service worker ([src/app/sw.ts](../src/app/sw.ts)) is built with
[Serwist](https://serwist.pages.dev/). It precaches two kinds of assets:

1. **Build chunks** — `.next/static/**/*.{js,css,woff,woff2}`, matched via
   `globPatterns` in
   [pre-cache/index.ts](../src/features/offline/service-worker/pre-cache/index.ts).
   Serwist derives a content hash for each of these automatically at build
   time, so they're always precached correctly — no manual step needed.

2. **The offline shell HTML and static metadata assets** — `/offline`,
   `favicon.ico`, `manifest.json`, etc. These are listed as explicit
   `entries` and are versioned with a single hand-maintained string,
   `shellRevision`, in the same file.

Serwist only re-fetches a precached URL when its revision string changes.
For the build chunks this happens automatically (new hash per build). For
`/offline`, it only happens when `shellRevision` is bumped by hand.

## Why `shellRevision` must be bumped on every release

`/offline` is server-rendered HTML that references the current build's
JS/CSS chunk filenames. Next.js gives those filenames a new content hash on
**every production build**, whether or not the offline feature itself
changed.

If `shellRevision` is *not* bumped on a release:

- Serwist treats the precached `/offline` HTML as unchanged and keeps
  serving the version from the previous build.
- That stale HTML still references the previous build's chunk filenames.
- After deploy, the previous build's chunks no longer exist on the server
  (only the new build's hashed filenames are deployed).
- When a user is actually offline and the service worker's navigation
  fallback (`serwist.setCatchHandler` in
  [src/app/sw.ts](../src/app/sw.ts)) serves the stale `/offline` HTML, the
  browser renders the server-side `Suspense` fallback
  (`"Loading"` in [offline/page.tsx](../src/app/(offline)/offline/page.tsx))
  first, then tries to fetch the old-hashed chunks to hydrate.
- Those chunks aren't in the cache (only current-build chunks get
  precached) and there's no network to fetch them from, so hydration never
  finishes. The user is stuck on a blank white screen showing "Loading".

## Rule of thumb

Bump `shellRevision` in
[pre-cache/index.ts](../src/features/offline/service-worker/pre-cache/index.ts)
on **every** production deploy — not just deploys that touch the offline
feature. It pins the shell to a specific build's chunk hashes, not to
"whether the offline UI changed."
