<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commit workflow

Whenever the user asks to commit changes:

1. Update `docs/CHANGELOG.md` with a concise summary of all changes included in the commit.
2. Bump the version in `package.json` before committing.
3. Use a semantic version bump requested by the user; otherwise default to a patch bump.
4. Keep the changelog release heading, release date, and `package.json` version synchronized.
5. Stage the changelog and version update together with the requested changes in the same commit.
