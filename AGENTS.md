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
