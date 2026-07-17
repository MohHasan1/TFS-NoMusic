# Data Caching (`use cache`)

This document explains how server-side data caching (Cache Components /
`"use cache"`) is used in this project. This is distinct from the offline
service-worker shell cache — see [OFFLINE_CACHING.md](./OFFLINE_CACHING.md)
for that.

## How it works

`cacheComponents: true` is enabled in [next.config.ts](../next.config.ts),
which turns on the `"use cache"` directive, `cacheLife`, and `cacheTag` from
`next/cache`. A function or component marked `"use cache"` has its return
value cached, keyed off its serializable arguments; `cacheLife` sets how
long an entry stays fresh, and `cacheTag` lets it be invalidated on demand
via `revalidateTag`.

Current usage:

| Location | Cached unit | `cacheLife` | `cacheTag` |
| --- | --- | --- | --- |
| [libraries/[id]/page.tsx](../src/app/(client)/(private)/libraries/[id]/page.tsx) `LibraryHeroSlot` | Library hero section | `max` | `` library:${id} `` |
| [libraries/[id]/page.tsx](../src/app/(client)/(private)/libraries/[id]/page.tsx) `LibraryAudioSlot` | Library audio list | `weeks` | `` library-audio:${id} `` |
| [LibSectionFrame.tsx](../src/components/private/libraries/elements/LibSectionFrame.tsx) | Library grid section (by type) | `max` | `` libraries:${type} `` |

`no-music.ports.ts` has commented-out `"use cache"` blocks (`listNomusic`,
`listNomusicPaginated`) — not yet enabled.

## Tag naming convention

Tags are `<resource>:<key>`, matching the identifier that changes it:

- `library:<id>` — a single library's own fields (name, author, image, etc.)
- `library-audio:<id>` — the audio/track list belonging to a library
- `libraries:<type>` — the library grid/listing for a given `type`

## Revalidation

Cache tags are invalidated from Payload collection hooks, right where the
underlying data changes:

- [collections/hooks/Libraries.ts](../src/collections/hooks/Libraries.ts) —
  on library create/update/delete, revalidates `library:<id>` and
  `libraries:<type>` (both old and new type, if it changed).
- [collections/hooks/NomusicLibraries.ts](../src/collections/hooks/NomusicLibraries.ts) —
  on a nomusic-library link change, revalidates `library-audio:<id>` for
  every affected library.

When adding a new `cacheTag`, add or update the matching `revalidateTag`
call in the collection hook that owns that data — otherwise the cached
entry will only clear when its `cacheLife` profile expires.

## Cache lifetimes in use

- **`max`** — `stale` 5 minutes (client), `revalidate` 30 days (server
  background refresh), `expire` 1 year (hard expiry). Used for library
  metadata (`LibraryHeroSlot`, `LibSectionFrame`) since it only changes
  through explicit CMS edits, already covered by the `revalidateTag` hooks
  above — not by time-based staleness.
- **`weeks`** — `stale` 5 minutes, `revalidate` 1 week, `expire` 30 days.
  Used for `LibraryAudioSlot`'s track list, as a shorter backstop in case a
  `library-audio:<id>` revalidation is ever missed.

## Notes

Standalone pitfalls, gaps, and things worth knowing that don't fit the
sections above. Append new ones here as they come up.

### Gotcha: don't pass the raw `params` Promise into a cached component

`"use cache"` derives its cache key from the function's serializable
arguments. A `Promise` (e.g. the route's `params: Promise<{ id: string }>`)
is not a supported serializable argument type, so a component that receives
it as a prop and `await`s it *inside* the cached scope can never resolve to
a stable cache key — it ends up re-executing on every request instead of
being served from cache, and the page's `<Suspense>` fallback shows on
every visit no matter what `cacheLife`/`cacheTag` is set.

Resolve `params` **outside** the cached scope and pass the plain value in:

```tsx
// Page (uncached) — resolve params here
<Suspense fallback={<Skeleton />}>
  {params.then(({ id }) => (
    <CachedSlot id={id} />
  ))}
</Suspense>

// Cached component — receives a plain string, not a Promise
async function CachedSlot({ id }: { id: string }) {
  "use cache";
  cacheLife("max");
  cacheTag(`resource:${id}`);
  return ...;
}
```

This is the pattern `libraries/[id]/page.tsx` follows. See
`node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md` for
the upstream reference example.

### Gotcha: client components reading `useSearchParams()` (or other runtime APIs) need a `<Suspense>` boundary too

`useSearchParams()`, `usePathname()`, `cookies()`, and `headers()` are all
runtime APIs — like route `params`, they're only known at request time. A
component that reads one needs an ancestor `<Suspense>` boundary, or its
output is simply missing from the static shell entirely (no error, no
fallback — just absent), since Next has nothing to bake into the prerender.

This bit `nomusic/page.tsx`'s `NoMusicHeaderSection` (a `"use client"`
component calling `useSearchParams()` to read the language filter): its
`<Suspense>` wrapper had been commented out, so the header's title/description
never appeared in the static HTML at all — confirmed by inspecting the built
`.next/server/app/nomusic.html`, which had zero `<h1>` tags. It only ever
rendered after client-side hydration. Re-wrapping it in `<Suspense>` with a
matching fallback fixed it — the fallback ships in the static shell
immediately, then swaps for the real client-rendered content once
`useSearchParams()` resolves in the browser.

See "Working with runtime APIs" in
`node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.

### Known gap: `generateStaticParams` only covers one library

`libraries/[id]/page.tsx`'s `generateStaticParams` calls
`listLibraries({ limit: 1 })`, so only one library id is part of the
build-time static shell. Every other library id is dynamic at build time —
its cache entries are only populated at request time (self-hosted via
`next start`, so entries persist in-memory across requests on the same
instance once populated; see the "Runtime caching considerations" section
of `node_modules/next/dist/docs/01-app/03-api-reference/01-directives/use-cache.md`
for how this differs on serverless hosts).
