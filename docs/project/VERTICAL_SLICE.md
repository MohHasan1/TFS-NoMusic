# Vertical slice architecture

The app is migrating from layer-first folders (`src/services/`, `src/server-actions/`,
`src/validations/`, `src/components/private|public/`) to **feature slices** under
`src/features/`. Each slice owns one domain end to end — its data access,
mutations, validation, UI, and hooks live together.

`src/features/playlists/` is the first slice. New work should follow it; existing
domains move over opportunistically.

## Why

- A change to "playlists" touches one folder, not six.
- No `public/` vs `private/` split inside a feature — that's an access concern,
  handled by the route group (`app/(client)/(public|private)`) and by access
  checks in the server layer, not by the folder tree.

## Slice layout

Each concern is a **folder**, not a dotted filename. No barrel / `index.ts` —
import the specific file you need.

```
src/features/<domain>/
  types/         DTOs returned to the UI (T-prefixed)
  constants/     client copy, limits, page sizes
  validations/   zod schemas + inferred types (shared client/server)
  server/
    ports.ts     thin orchestration entrypoints
    adapter.ts   Payload implementation — `import "server-only"`
    mapper.ts    Payload doc -> DTO
    select.ts    Payload `select` objects
  queries/       read helpers for pages (resolve user, call ports); `import "server-only"`
  actions/       "use server" mutations -> successResponse / errorResponse
  components/
    elements/    small pieces
    sections/    page sections
    views/       the page composition (mimics the route)
  hooks/
```

Component folders follow the same `elements/ sections/ views/` convention as
`src/components/private/<domain>/`.

## The layers inside a slice

| Layer | Rule |
| ----- | ---- |
| `server/adapter.ts` | Only file that talks to Payload. `import "server-only"`. Wrap calls in `tryCatchResponse`. Enforce access with `overrideAccess: false` + `user` (or an explicit `where` on the owner). |
| `server/mapper.ts` | Pure. Payload doc in, DTO out. No IO. |
| `server/ports.ts` | Thin. Re-exposes adapter calls with a stable signature. No auth logic here. |
| `queries/*` | Read entrypoints for pages. Resolve the current user, then call a port. `import "server-only"`. |
| `actions/*` | `"use server"`. Shape: `safeParse` -> `getCurrentUser()` -> port -> `successResponse` / `errorResponse`. Never import an adapter directly. |
| `validations/*` | zod only. Imported by both the action (server) and the form (client). |
| `components/*` | Presentational + client interactivity. Call actions, never ports/adapters. |

Data flow: `page` -> `views/` -> `queries/` -> `ports` -> `adapter` -> Payload
· `form` -> `actions/` -> `ports` -> `adapter` -> Payload.

## What stays OUT of a slice

| Stays | Where | Why |
| ----- | ----- | --- |
| Collection config + hooks | `src/collections/` | Payload/CMS schema layer |
| Design primitives | `src/components/ui/` | shadcn |
| Cross-feature components | `src/components/shared/`, `src/components/private/shared/` | logo, page shells, empty states |
| App shells / layouts | `src/components/_layout/` | used by many features |
| Payload client, auth, zod fields, loggers, responses | `src/lib/` | framework infra |
| Global constants (routes, cache tags) | `src/constants/` | not domain-specific |
| Route files | `src/app/` | thin; grab params, import a `views/` component, render it |

## Import rules

- A slice may import from `src/lib/`, `src/components/ui`, `src/components/shared`,
  `src/components/private/shared`, `src/constants/`, and `src/collections`
  (types/constants only).
- `app/` imports a slice's `views/` (or other public files) by path — there is no
  barrel.
- `server/adapter.ts` is `server-only` and never imported by a component.

## Playlists slice — current state

Only the UI is built. The list and detail pages render, with track/list data
stubbed (`// TODO`). The `server/ queries/ actions/ types/ constants/
validations/ hooks/` folders exist but are empty, reserved for the data layer.

```
features/playlists/
  components/
    elements/  PlaylistCard · PlaylistEmptyBox · PlaylistGridSkeleton
               PlaylistCover · PlaylistTrackRow · PlaylistAudioBrowser
               PlaylistHeroSkeleton · PlaylistAudioSectionSkeleton · PlaylistAudioEmptyBox
    sections/  PlaylistsHeaderSection · PlaylistsContentSection
               PlaylistHeroSection · PlaylistAudioSection
    views/     PlaylistsView (list)  ·  PlaylistView (detail)
```

Routes: `/playlists` -> `PlaylistsView`, `/playlists/[id]` -> `PlaylistView`
(`src/app/(client)/(private)/playlists/`).

See `docs/playlist/v1.md` for the collection and `docs/playlist/visibility.md`
for the access model.
