# NoMusic title search

`/nomusic` has a title search box (`NomusicSearchInput.tsx`) next to the language filter. It's wired into the same filter pipeline as language: `TNomusicFilters` (`client-actions/private/nomusic/keys.ts`) carries a `search` key, `buildNomusicWhere` (`client-actions/private/nomusic/utils.ts`) turns it into a Payload `where` clause, and it flows through the existing client-side TanStack infinite query — not the cached SSR section, so it doesn't touch caching.

Search runs only when the search button is pressed, not live as-you-type, to keep query volume down (see "Why not live search" below).

## The three options for matching

The database here is MongoDB. Payload's `like` operator becomes a case-insensitive regex (`{ $regex: value, $options: "i" }`). Which variant you use changes both the UX and whether an index can help at all.

### 1. Unanchored "contains anywhere" — `like: value` (current implementation)

- Query: `/value/i` — matches the text anywhere in the field.
- UX: most intuitive — typing "ove" matches "Love Story".
- Performance: **cannot use an index, ever**, indexed field or not. An unanchored regex has no fixed starting point for an index to jump to, so MongoDB has to check every document (`COLLSCAN`) — same as a phone book search for "contains the letters 'ith' anywhere," which has no shortcut regardless of alphabetical sorting.
- Tried switching to option 2 (anchored) briefly — reverted, since "starts with" felt broken in practice for how this app's users actually search (e.g. typing part of a title mid-word, which is a completely normal way to search).

### 2. Anchored "starts with" — `like: "^" + value` (tried, reverted)

- Query: `/^value/i` — matches only from the start of the field.
- UX: stricter — typing "ove" will **not** match "Love Story"; typing "Love" will. In practice this felt like search was broken/returning nothing for completely reasonable queries.
- Performance: MongoDB *can* use a regular index for a prefix-anchored regex, the same way a phone book index lets you jump straight to the "S" section for "starts with Smith."
- Requires: `index: true` on the field being searched.
- Cost to add: trivial — one string change (add `^`) plus the field-level index. No new query pattern. Cheap to try again later if the catalog grows large enough that option 1's full scan becomes an actual problem.

### 3. Full-text index — MongoDB `$text` search

- A genuine MongoDB text index across one or more fields, queried via `$text: { $search: value }` instead of `like`.
- UX: matches whole words anywhere in the field, stemmed (e.g. "loving" also matches a search for "love"). Does **not** match arbitrary substrings — a mid-word fragment like "ov" or "tory" won't match anything, unlike option 1.
- Performance: fast at any catalog size, real index support for "find this word anywhere."
- Cost to add: meaningfully higher — Payload's standard `where`-clause query builder (`payload.find({ where })`, the pattern used everywhere else in this codebase, including `buildNomusicWhere`) has no first-class `$text` support, so this needs a custom query that talks to the underlying MongoDB driver more directly, bypassing the usual pattern.

## Current state

- Title (`name`) **and** artist — unanchored "contains anywhere" match against either field (`or: [{ name: { like } }, { artist: { like } }]` in `buildNomusicWhere`). User input is escaped (`escapeRegExp`) before being used as a regex, so characters like `.`, `(`, `*` etc. are treated literally instead of as regex syntax.
- `index: true` is still set on both `NoMusic.ts`'s `name` and `artist` fields, but **currently unused by this query** — kept in place (cheap, ~15–30 bytes/document) in case option 2 or 3 gets revisited later.
- Option 3 (full-text) isn't implemented. Both indexed alternatives (2 and 3) trade away "contains anywhere" matching for real query performance — only worth it if the catalog grows large enough that a full collection scan on every search becomes an actual, measured problem.
