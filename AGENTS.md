<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commit workflow

Whenever the user asks to commit changes:

1. Stage and commit the requested code changes.
2. Add notable user-facing changes to the `[Unreleased]` section of `docs/CHANGELOG.md`.
3. Do not bump the version in `package.json` for normal commits.
4. Only bump the version when the user explicitly asks to create or prepare a release.
5. During a release:

   * Use the semantic version bump requested by the user.
   * If no bump type is provided, default to patch.
   * Move the relevant entries from `[Unreleased]` into a new release section.
   * Keep the changelog version, release date, Git tag, and `package.json` version synchronized.
   * Commit the release changes together.

## Proxy documentation

Whenever `src/proxy.ts` or its authentication, routing, redirect, cookie, token, or preferred-language behavior changes, update `docs/PROXY_AUTH.md` in the same change.

## UI implementation

- Prefer the project's installed shadcn components and existing shared components instead of building equivalent UI primitives from scratch.
- Before creating a UI component, check the shadcn registry for an available equivalent. If it exists but is not installed in the project, install and use it.
- Reuse the app's theme tokens and semantic color classes. Do not hardcode colors when an appropriate theme token exists.
- Keep Tailwind usage minimal: add only the classes required to achieve the requested layout, state, and responsive behavior.
- Reuse existing variants, utilities, and component APIs before introducing custom styling or duplicated abstractions.
