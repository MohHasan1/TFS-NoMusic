# Changelog

This file tracks notable user-facing and architectural changes to the project.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Add new work under **Unreleased**, grouped as Added, Changed, Fixed, or Removed. When releasing, move those entries into a dated version section.

## Unreleased

### Changed

- Increased mobile bottom navigation row height and top-aligned nav items on both the private and offline layouts.
- Cached NoMusic listing and paginated listing with a days-long cache life tagged `audio`, using Next.js `"use cache"`.

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
