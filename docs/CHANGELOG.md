# Changelog

This file tracks notable user-facing and architectural changes to the project.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Add new work under **Unreleased**, grouped as Added, Changed, Fixed, or Removed. When releasing, move those entries into a dated version section.

## Unreleased

### Added

- Added a `playlists` collection so signed-in users can create their own playlists of NoMusic tracks. Playlists are owned by their creator (owner or admin can edit/delete), carry a `private`/`public`/`unlisted` visibility, an optional cover image (upload only), an auto-synced `trackCount`, and a denormalized `author` name (kept in sync with the owner so lists don't have to populate the relationship). A cosmetic `slug` is generated from the name and kept in sync when the name changes; playlists are addressed by `id`. Admins can also create playlists from the dashboard and pick the owner.
- Added the `/playlists` page — it fetches the current user's playlists client-side (TanStack Query) and renders them as cards, with loading, empty, and error states. Added a Playlists entry in the private navbar.
- Added the `/playlists/[id]` page — fetches one playlist with its tracks in a single client query, renders the hero and track list, and starts playback from a clicked row. Shows a not-found state when the playlist is missing or private.
- The playlist owner can edit the name, description, and visibility from a dialog on the playlist page (server action, owner-enforced; the card and page update after saving). Name and description limits live in one constant.
- The playlist owner can enter an "Edit tracks" mode on the playlist page to reorder tracks (up/down) and remove them; changes are local until Save, which persists the whole track list in one server action (owner-enforced). The edit-mode state lives in a `usePlaylistAudioEditor` hook.
- The playlist page's track section has a toolbar with Play all and Shuffle (both usable by anyone who can view the playlist), plus the owner's edit controls. Playlist count and track-count caps are defined in `PLAYLIST_LIMITS` (10 playlists per user, 100 tracks per playlist).
- NoMusic cards have an "add to playlist" button (top-right) that opens a dialog listing the user's playlists (toggle in/out) with an inline "New playlist" create form. The dialog is opened from anywhere via a `usePlaylistAddDialog` store hook and rendered once in the private layout. UI only — the add/remove and create wiring is still stubbed.

### Changed

- Consolidated the duplicated `syncUploadImageURLBeforeValidate` collection hook (previously copy-pasted in `hooks/Libraries.ts`, `hooks/user.ts`, and `hooks/noMusic.ts`) into a single `src/collections/hooks/_shared.ts`, now used by Libraries, Users, Nomusic, and Playlists.
- Moved the dialog/alert-dialog border and glow shadow into the base `DialogContent` / `AlertDialogContent` so every dialog is consistent, and removed the per-usage copies (and stray `bg-card-secondary` overrides) from the logout, PWA-install, and offline dialogs.
- Default body text colour is now `primary-200` (the de-facto default) instead of `foreground`; the library detail hero uses the token instead of hardcoded `text-white/*`.

### Fixed

- `getGradientFromText` returned `undefined` for names shorter than 5 characters (producing an invalid CSS class and no gradient); short strings are now padded before hashing. Existing gradients for longer names are unchanged.

## [0.3.11] - 2026-08-27

### Fixed

- Set the Nepali library id fallback now that the library exists in prod, completing the Nepali language rollout.

## [0.3.10] - 2026-08-27

### Added

- Added a `link` field to Requests (Email Settings), for the in-app destination to use as the return link in the request-approved email.

### Fixed

- Fixed the request-approved email's return link using the requester's original YouTube/Spotify URL instead of a link back into the app.

## [0.3.9] - 2026-08-27

### Fixed

- Fixed the NoMusic playback queue not rebuilding when a search filter changed the visible track list — the playback source key was keyed only by language, so searching (or clearing a search) within the same language reused the previous, now-stale queue instead of rebuilding it, breaking next/previous navigation after playing a search result.

## [0.3.8] - 2026-08-27

### Added

- Added a title search box to `/nomusic`, next to the language filter. Search runs only when the search button is pressed (not live as-you-type) to limit database load, and includes a clear button to reset it.
- NoMusic search now also matches artist, not just title.
- Added Nepali as a NoMusic language option.
- Added a small skeleton row to the NoMusic grid while loading the next infinite-scroll page, appended as real grid children (not a separate block) so it continues the same row/column flow as the loaded cards.

### Fixed

- Fixed the NoMusic language filter's selected value overflowing its pill instead of truncating when space is tight.
- Fixed `getLibraryIdByLanguage`'s database fallback filtering by a `languageValue` field that doesn't exist on the `libraries` collection (now filters by `slug`), so languages without a hardcoded `LIBRARY_IDS` entry can actually resolve.

## [0.3.7] - 2026-07-31

### Changed

- Disabled the `seekbackward`/`seekforward` lock-screen/notification controls (rewind/fast-forward) since registering them made Chrome/Android show seek buttons in the notification instead of `nexttrack`/`previoustrack` (track skip), with no way to prefer one pair over the other.
- Re-enabled explicit lock-screen `playbackState` reporting (play/pause icon) after fixing a missing effect dependency.

## [0.3.6] - 2026-07-31

### Fixed

- Fixed lock-screen/notification play controls resuming a track with no audible sound (progress kept advancing but nothing played) until the app was reopened — the `play`/`pause` notification buttons now go through the app's own resume/pause logic instead of the browser's default media-element handling.

### Added

- Added `stop`, `seekbackward`, and `seekforward` lock-screen/notification media controls.
- The lock-screen/notification now reports accurate playback position and play/pause state instead of relying on the browser's own estimate.

## [0.3.5] - 2026-07-17

### Changed

- `libraries/[id]`'s `generateStaticParams` now prerenders up to 25 libraries (all types) instead of just one, so more library pages load instantly instead of showing a loading skeleton on first visit.
- The NoMusic language filter now uses the app's loading-indicator-aware router (`nextjs-toploader/app`) instead of `next/navigation`, matching other navigations in the app.

## [0.3.4] - 2026-07-16

### Added

- Added per-language NoMusic routes (`/nomusic/bangla`, `/nomusic/hindi`, etc.) alongside `/nomusic`, replacing `?language=` query-string filtering. Invalid language segments redirect to `/nomusic`.

### Changed

- Shortened the library audio-list cache lifetime from `max` to `weeks` as a shorter revalidation backstop.
- NoMusic's language filter now navigates between real routes instead of rewriting the URL client-side, and its paginated list is cached per language (`"use cache"`, `weeks` lifetime) instead of always fetching on every request.

### Fixed

- Fixed the library page's hero and audio-list sections always showing their loading skeleton instead of serving from cache, caused by passing the unresolved route `params` promise into a `"use cache"` component instead of a plain resolved id.
- Fixed a library's `trackCount` staying permanently inflated after a linked song was deleted directly (rather than by unlinking it first) — deleting a NoMusic doc now also removes its now-orphaned `nomusic-libraries` link rows.
- Fixed the preferred-audio-language redirect (after sign-in, and when returning from offline mode) silently landing on the unfiltered `/nomusic` collection instead of the user's language — it was still targeting the now-defunct `/nomusic?language=` query param instead of the `/nomusic/<language>` route.

## [0.3.3] - 2026-07-16

### Added

- Added an offline "Storage" page (`/offline?view=storage`, reachable from the offline menu) showing used/available device storage via `navigator.storage.estimate()`.
- Added "Recently Added NoMusic" and "Recently Added Libraries" preview sections to the offline home page, each linking to its full offline view, with matching skeleton loading states.
- Added a "Home" destination to the offline navbar and mobile bottom navigation.

### Changed

- `OfflineNomusic.getAll()` / `OfflineLibraries.getAll()` now accept an optional `limit`, reading only the N most recent records off the `downloadedAt` IndexedDB index instead of loading everything and slicing in memory. `useNomusic`/`useLibraries` pass it through.

### Fixed

- Fixed the player's track source label falling back to nothing for source keys with no explicit label (e.g. the offline home page's "Recently Added" preview) — now falls back to "Nomusic".
- Fixed the checkbox/radio dropdown menu item indicator position (`end-2` → `inset-e-2`).
- Reworked the offline home page's top navigation cards (icon+title inline, responsive spacing, full-width layout) and rewrote their descriptions.

## [0.3.2] - 2026-07-12

### Fixed

- Bumped the offline shell precache revision, which was stuck on a stale build's precached `/offline` HTML pointing to JS chunk hashes no longer served after deploy — this caused offline mode to hang on a blank "Loading" screen. Documented the caching mechanism and the requirement to bump the revision on every deploy in `docs/OFFLINE_CACHING.md`.

## [0.3.1] - 2026-07-12

### Added

- Added `data-ph-capture-attribute-action` tagging to the sign-in, forgot-password, and signup form submit buttons, the PWA install button, each NoMusic language filter option, and the brand logo link, completing the analytics tagging plan documented in `docs/ANALYTICS.md`.
- Excluded the Payload admin panel (`/admin`) from PostHog tracking entirely — `initAnalytics()` is never called there.

## [0.3.0] - 2026-07-12

### Added

- Added a PostHog-backed analytics feature slice: client-side init, a typed `AnalyticsEvents` map with `track()`, and `useIdentifyUser`/`useResetIdentity` hooks wired into the private user menu and logout flows.
- Added `data-ph-capture-attribute-action` tagging (plus `audio-id`/`audio-name`/`library-id`/`library-name` where available) across 16 interactive elements — NoMusic and library cards/rows, download/remove buttons, the player dialog toggle, go-online and logout confirmations, and the profile/offline-mode menu items — with `autocapture` scoped via `css_selector_allowlist` so only tagged elements are ever captured. Documented the full convention, including the `_offline` action suffix for offline-only interactions, in `docs/ANALYTICS.md`.
- Added an `isDevEnv` helper to `#lib/env`, used to opt PostHog out of capturing by default in development.

### Changed

- Prioritized and unoptimized (in dev) the profile image for faster local loading.

## [0.2.5] - 2026-07-12

### Changed

- Centralized revoked-session redirects through `PUBLIC_ROUTES.LOGOUT` in the private navbar and profile, and documented the redirect-loop warning for future authentication changes.

## [0.2.4] - 2026-07-11

### Changed

- Documented the two-layer authentication architecture, its security boundaries, and the performance trade-off behind local JWT gating followed by Payload session validation, with contributor guidance to request approval before updating the authentication document.

### Fixed

- Prevented redirect loops after a Payload database session is revoked by clearing the stale authentication cookie and redirecting to a clean sign-in URL without an additional database request.

## [0.2.3] - 2026-07-11

### Changed

- Refactored Proxy authentication into focused route, token, user-fallback, and preferred-language helpers.
- Added the preferred audio language to user JWTs so normal authenticated navigation avoids a user API request.
- Documented Proxy authentication, routing, redirect, cookie, token, and preferred-language behavior.
- Updated contributor guidance to keep Proxy documentation synchronized and to prefer shadcn components, app theme tokens, and minimal Tailwind styling.

## [0.2.2] - 2026-07-11

### Fixed

- Fixed the mobile player bar sitting too low against the taller bottom navigation by updating its hardcoded bottom offset to match the increased nav height.

## [0.2.1] - 2026-07-11

### Changed

- Increased mobile bottom navigation row height and top-aligned nav items on both the private and offline layouts.
- Synced the player dialog's open/close animation (slide-from-bottom, timing, and backdrop fade) with the player bar and bottom nav's slide transitions.
- Centered the player controls in the player dialog footer.
- Bumped the offline shell precache revision to pick up the updated shell HTML.

## [0.2.0] - 2026-07-11

### Added

- Added a mobile bottom navigation with NoMusic, Libraries, Request, and Profile destinations.
- Added a matching offline bottom navigation and offline dropdown menu with a connectivity-aware “Go online” action.
- Added an offline user store that precaches the signed-in user's profile and avatar to IndexedDB and Cache Storage for offline use.

### Changed

- Reorganized private layout components into dedicated navbar, mobile navigation, and user-menu folders.
- Coordinated mobile player and bottom-navigation positioning and transitions so both move out of view when the player dialog opens.
- Updated private page spacing and player-bar layout behavior for the new mobile navigation.
- Reorganized offline layout components into dedicated navbar, mobile navigation, and offline-menu folders.
- Updated offline `ViewContainer` spacing and player-dialog transitions to match the online mobile layout.
- Updated the offline dropdown menu to show the cached user's avatar, name, and email instead of a generic offline label.
- Split logout cleanup into separate playback and offline-user cleanup hooks, clearing the cached offline user and avatar on logout.
- Refined NoMusic card, language filter, and player text colors for better contrast, and synced the NoMusic card color updates to its offline counterpart.

### Fixed

- Fixed Base UI trigger semantics when opening the online dialog from the offline dropdown menu.

## [0.1.3] - 2026-07-10

### Added

- Added a user service with ports and Payload adapter layers for fetching users by ID.
- Added `createdAt` to the default populated fields for users.
- Added lightweight local verification for Payload JWT signatures and expiration using `jose`.

### Changed

- Updated the private user menu fallback labels and formatting.
- Changed the repository workflow so normal commits update `Unreleased` without automatically bumping the package version.
- Protected library routes in Proxy without a database-backed authentication request during normal navigation.
- Redirect unauthenticated profile and private-menu requests to sign-in.
- Limited `/api/users/me` checks in Proxy to flows that require the user's preferred audio language.
- Enabled Payload Admin token auto-refresh while the Admin Panel remains open.

### Architecture notes

- Protected pages now use two authentication layers. Proxy performs lightweight JWT signature and expiration verification before routing, allowing cached and partially prerendered page content to begin rendering quickly without a database request.
- `PrivateUserMenuServer` renders within a Suspense boundary and performs Payload's full authentication check, including database-backed session validation. If the session is revoked, missing, or otherwise invalid, it redirects the user to sign-in.
- This approach was chosen to keep routine navigation and refreshes fast while still validating the authoritative account session during navbar rendering. The trade-off is that page content can begin streaming before the full session check finishes; sensitive APIs and database operations must therefore continue enforcing Payload access control independently.

## [0.1.2] - 2026-07-10

### Added

- Added a repository commit workflow requiring each requested commit to update this changelog and bump the package version.
- Added patch bumps as the default when no semantic version level is requested.

## [0.1.1] - 2026-07-10

### Added

- Added ISR-style caching for `/libraries/[id]`, with separate cache entries for library details and library audio.
- Added cache tags scoped by library ID: `library:{id}` and `library-audio:{id}`.
- Added static parameter generation for an initial library page while allowing other library IDs to be generated on demand.
- Added independent caching for library list sections using type-specific tags: `libraries:album`, `libraries:user`, and `libraries:language`.
- Added Payload collection hooks to revalidate library detail and library-type list caches after library changes.

### Changed

- Library content no longer opts into request-time rendering with `connection()`, allowing cached output to be shared across users.
- Changing a library's type now invalidates both its previous and current type sections.
- Creating, updating, or deleting a library immediately expires the affected type-section cache so the next request regenerates fresh content.

### Notes

- Cache behavior should be verified with a production build (`pnpm build` and `pnpm start`), because development-mode caching and HMR behave differently.
- Commits: `bda70fc` and `d9a69da`.
