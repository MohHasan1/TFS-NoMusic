# `/nomusic` Language Routing: Before vs After

Scope: switch language filtering from `?language=` query string to a real
route segment (`/nomusic/[language]`). **No caching added in this pass** —
that comes later, added at the component level (same pattern as
`LibraryHeroSlot`/`LibraryAudioSlot` in `libraries/[id]/page.tsx`, see
[CACHING.md](./CACHING.md)).

## Routing

| | Before | After |
|---|---|---|
| URL for "all languages" | `/nomusic` | `/nomusic` (unchanged) |
| URL for a language | `/nomusic?language=hindi` | `/nomusic/hindi` |
| Known languages | n/a | `generateStaticParams` returns all 5 (`bangla`, `hindi`, `english`, `arabic`, `others`) |
| Invalid language | n/a (bad query values silently ignored/stripped) | `redirect()` to `/nomusic` |

New file: `src/app/(client)/(private)/nomusic/[language]/page.tsx`

## `NoMusicHeaderSection.tsx`

| | Before | After |
|---|---|---|
| Component type | `"use client"` | plain Server Component |
| Language source | `useSearchParams()` | `language` prop |
| Suspense needed? | Yes — `useSearchParams()` is a runtime API, so without `<Suspense>` its output is silently missing from the static shell | No — no runtime API access left, renders deterministically |

## `NomusicLanguageFilter.tsx`

| | Before | After |
|---|---|---|
| Reads current language via | `useSearchParams()` | `language` prop |
| Reads current path via | `usePathname()` | not needed (routes are fixed via `PRIVATE_ROUTES`) |
| Navigates via | `window.history.replaceState` (no real navigation, no prefetch) | `router.push()` to `/nomusic` or `/nomusic/${value}` |
| Local state | `useState` + `useEffect` to reconcile URL → UI, plus a one-off "migration" effect to strip bad legacy `?language=` values | none needed — prop is always valid, Select is fully controlled by it |

## `NoMusicLanguageFilterSection.tsx`

| | Before | After |
|---|---|---|
| Props | none | `language` (passed through to `NomusicLanguageFilter`) |

## `noMusicContentSection.tsx` (server)

| | Before | After |
|---|---|---|
| Fetches | `listNomusicPaginated({ page, limit })` — **always unfiltered**, regardless of URL | `listNomusicPaginated({ page, limit, language })` — matches the route |

## `NoMusicContent.tsx` (client)

| | Before | After |
|---|---|---|
| Language source | `useSearchParams()` | `language` prop |
| Everything else (`useInfiniteQuery`, `NoMusicBrowser`, `NoMusicInfinityObserver`) | unchanged | unchanged |

## `query.ts` (`useNomusicPageInfiniteQuery`)

| | Before | After |
|---|---|---|
| `initialData` | `hasFilters ? undefined : { pages: [initialData], ... }` — **thrown away whenever a language filter is active**, because the server fetch was always unfiltered and would be wrong data (see the `// TODO: double fetch` comment in `NoMusicContent.tsx`) | always `{ pages: [initialData], ... }` — server now fetches the *correct* language's page 1, so it's always valid |
| Practical effect | filtered views always double-fetch (SSR page discarded, client refetches page 1 from scratch) | filtered views get a real first paint + only fetch page 2+ client-side |

## Data layer

| | Before | After |
|---|---|---|
| `listNomusicPaginatedAdapter` args | `{ page, limit }` — no filtering capability at all server-side | `{ page, limit, language }` — builds a Payload `where: { language: { equals } }` |
| `"use cache"` / `cacheTag` / `cacheLife` | commented out, unused | **still commented out — out of scope for this pass** |
| Revalidation hooks on `Nomusic` collection | none exist | **not added in this pass** |

## Infinite scroll — unaffected

`useNomusicPageInfiniteQuery`, `fetchNomusicInfiniteFn`, `NoMusicInfinityObserver`,
`QUERY_KEYS.nomusic.infinite` — no logic changes. Page 2+ is still fetched
client-side from `/api/nomusic` with the same `where` clause it uses today;
only *where the `language` value comes from* changes (route param instead of
query string).

## New

- `PRIVATE_ROUTES.NOMUSIC_LANGUAGE(language)` → `/nomusic/${language}` helper
- `src/app/(client)/(private)/nomusic/[language]/page.tsx`
- A shared view component so `/nomusic` and `/nomusic/[language]` render the
  same section tree, each just resolving `language` differently (undefined
  vs. route param)
