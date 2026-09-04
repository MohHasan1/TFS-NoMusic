# Playlist visibility

A playlist has one of three visibility modes, set on the `visibility` field
(`src/collections/Playlists.ts`). Default is `private`.

## What each mode means

| Mode         | Who can open it                     | Shows in browse / search / discovery lists | Like                        |
| ------------ | ----------------------------------- | ------------------------------------------- | --------------------------- |
| **private**  | Owner and admin only                | No                                          | A private document          |
| **public**   | Any signed-in user                  | Yes                                         | A public YouTube video      |
| **unlisted** | Any signed-in user who has the link | No                                          | An unlisted YouTube video   |

The only difference between **public** and **unlisted** is discoverability. Both
can be opened by other people. A public playlist is meant to appear in listings
(a browse page, the owner's profile, search); an unlisted one stays hidden
unless someone is given the URL.

## How it is enforced — two layers

### Layer 1: access control

`playlistAccess.canRead` in `src/collections/access/playlist.ts` decides whether
a request may read a playlist document at all.

```ts
if (!user) return false;              // must be signed in
if (user.role === "admin") return true;

return {
  or: [
    { user: { equals: user.id } },     // the owner
    { visibility: { not_equals: "private" } }, // anyone else, if not private
  ],
};
```

At this layer **public and unlisted behave the same** — both are "not private",
so both are readable by any signed-in user. Private is owner/admin only.

This runs on every read through Payload (Local API, REST, GraphQL, admin), so a
non-owner simply cannot load a private playlist.

### Layer 2: app queries

Which playlists a given screen *shows* is a plain `where` filter in the server
action or page that builds the list. This is where public and unlisted split.

| Screen                          | Query filter                                   | Result                                  |
| ------------------------------- | ---------------------------------------------- | --------------------------------------- |
| Browse / discovery              | `where: { visibility: { equals: "public" } }` | public only; unlisted and private hidden |
| Open one playlist (by id)       | `payload.findByID({ collection: "playlists", id })` | works for public and unlisted; private blocked by layer 1 |
| "My playlists" (owner)          | `where: { user: { equals: meId } }`           | all three — they are the owner's        |

## Current state

- **private** — fully working. Only the owner and admins can read.
- **public** — readable by others (layer 1). "Appears in a browse list" is not
  built yet because there is no browse page.
- **unlisted** — readable by others via a direct fetch (layer 1). "Hidden from
  lists" is not built yet because nothing lists playlists.

The field exists so the data model is correct from the start. The real
difference between public and unlisted only shows up once the sharing and
discovery pages are built — see the deferred items in `docs/playlist/v1.md`. At
that point each listing query decides whether to include `unlisted` rows.

## The values live in one place

`src/collections/constants/playlists.ts`:

- `PLAYLIST_VISIBILITY` — the raw list `["private", "public", "unlisted"]`.
- `TPLAYLIST_VISIBILITY` — the union type `"private" | "public" | "unlisted"`,
  for typing variables in app code.
- `PLAYLIST_VISIBILITY_OPTIONS` — the `{ label, value }[]` the select field uses.

Import from here (not from the collection config) when app code needs to filter
or label by visibility.
