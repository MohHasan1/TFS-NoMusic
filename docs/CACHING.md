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
| [libraries/[id]/page.tsx](../src/app/(client)/(private)/libraries/[id]/page.tsx) `LibraryHeroSlot` | Library hero section | `max` | `CACHE_TAG.LIBRARY.DETAIL(id)` |
| [libraries/[id]/page.tsx](../src/app/(client)/(private)/libraries/[id]/page.tsx) `LibraryAudioSlot` | Library audio list | `weeks` | `CACHE_TAG.LIBRARY.AUDIO(id)` |
| [LibSectionFrame.tsx](../src/components/private/libraries/elements/LibSectionFrame.tsx) | Library grid section (by type) | `max` | `CACHE_TAG.LIBRARY.LIST(type)` |
| [noMusicContentSection.tsx](../src/components/private/nomusic/sections/noMusicContentSection.tsx) `NoMusicContentSection` | NoMusic paginated list (page 1) | `weeks` | `CACHE_TAG.NOMUSIC.LIST(language)` or `.ALL` |

`no-music.ports.ts` has commented-out `"use cache"` blocks (`listNomusic`,
`listNomusicPaginated`) — left disabled intentionally. Caching for nomusic
lives at the component level (`NoMusicContentSection`) instead, same as the
`libraries/[id]` pattern.

## Tag naming convention

All tag strings live in one place: [src/constants/cache-tags.ts](../src/constants/cache-tags.ts),
`CACHE_TAG`. Import it from there in both directions — the `cacheTag(...)`
call and the `revalidateTag(...)` call that invalidates it — instead of
hand-writing template strings. That's the whole point: `cacheTag` and
`revalidateTag` always live in different files (a component vs. a
collection hook), so a hand-written string is one typo away from silently
never invalidating.

Tags are `<resource>:<key>`, matching the identifier that changes it:

- `CACHE_TAG.LIBRARY.DETAIL(id)` → `library:<id>` — a single library's own
  fields (name, author, image, etc.)
- `CACHE_TAG.LIBRARY.AUDIO(id)` → `library-audio:<id>` — the audio/track
  list belonging to a library
- `CACHE_TAG.LIBRARY.LIST(type)` → `libraries:<type>` — the library grid/
  listing for a given `type`
- `CACHE_TAG.NOMUSIC.LIST(language)` → `nomusic:<language>` — the NoMusic
  list for a given language route (`/nomusic/<language>`)
- `CACHE_TAG.NOMUSIC.ALL` → `nomusic:all` — the unfiltered `/nomusic` route

Adding a new cached resource? Add its tag builder(s) to `CACHE_TAG` first,
then use it from both the `cacheTag` and `revalidateTag` call sites.

## Revalidation

Cache tags are invalidated from Payload collection hooks, right where the
underlying data changes. Relations mean one change can touch several tags —
this table is the source of truth for what invalidates what:

| Change | Hook | Tags revalidated |
| --- | --- | --- |
| Library created / updated / deleted | [Libraries.ts](../src/collections/hooks/Libraries.ts) | `LIBRARY.DETAIL(id)`, `LIBRARY.LIST(type)` (+ old `LIBRARY.LIST(type)` if `type` changed) |
| Nomusic↔library link created / updated / deleted | [NomusicLibraries.ts](../src/collections/hooks/NomusicLibraries.ts) | `LIBRARY.AUDIO(libraryId)` |
| Nomusic doc created / updated / deleted | [noMusic.ts](../src/collections/hooks/noMusic.ts) | `NOMUSIC.LIST(language)`, `NOMUSIC.ALL` (+ old `NOMUSIC.LIST(language)` if `language` changed), **and** `LIBRARY.AUDIO(libraryId)` for every library that song is linked to |

The last row is the one to remember: a song can belong to more than one
library (language, album, or user — see the unique index on
`nomusic-libraries`), so editing a song's own fields (name, audio file,
etc.) has to walk `nomusic-libraries` and revalidate every linked library,
not just fire a single tag.

When adding a new `cacheTag`, add a row here and wire the matching
`revalidateTag` call into the collection hook that owns that data —
otherwise the cached entry only clears when its `cacheLife` profile expires.

## Cache lifetimes in use

- **`max`** — `stale` 5 minutes (client), `revalidate` 30 days (server
  background refresh), `expire` 1 year (hard expiry). Used for library
  metadata (`LibraryHeroSlot`, `LibSectionFrame`) since it only changes
  through explicit CMS edits, already covered by the `revalidateTag` hooks
  above — not by time-based staleness.
- **`weeks`** — `stale` 5 minutes, `revalidate` 1 week, `expire` 30 days.
  Used for `LibraryAudioSlot`'s and `NoMusicContentSection`'s track lists,
  as a shorter backstop in case a `library-audio:<id>` / `nomusic:<language>`
  revalidation is ever missed.

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
  cacheTag(CACHE_TAG.LIBRARY.DETAIL(id));
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
rendered after client-side hydration.

That instance is now moot for a different reason: `/nomusic` moved from
`?language=` query-string filtering to a real `/nomusic/[language]` route
(see [NOMUSIC.md](./NOMUSIC.md)), so `NoMusicHeaderSection` takes `language`
as a plain prop instead of reading `useSearchParams()` — it's a deterministic
Server Component now, no runtime API access, no `<Suspense>` needed at all.
The lesson still applies to any other component reading a runtime API
without an ancestor `<Suspense>` boundary.

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
