# Changelog

This file tracks notable user-facing and architectural changes to the project.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Add new work under **Unreleased**, grouped as Added, Changed, Fixed, or Removed. When releasing, move those entries into a dated version section.

## Unreleased

### Added

- Add new changes here.

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
