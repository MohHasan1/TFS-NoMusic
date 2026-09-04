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

## What happens when someone opens a shared playlist

Everyone using the app has their own account (the `users` collection, auth is
on). "Another user" always means a signed-in account.

When user B opens user A's public or unlisted playlist:

- Layer 1 lets them read it (it is not private, and B is signed in).
- B can view and play the tracks.
- B **cannot edit it** — `update` and `delete` are owner/admin only.
- **Nothing is saved to B's account.** Opening a playlist is a stateless read.

An account only "holds" playlists the user *created* (`where: { user: me }`). It
does not remember playlists the user has *opened*. So the only way B gets back to
A's playlist is by keeping the URL — there is nothing in B's account UI that
points to it.

Two more things about `unlisted` specifically:

- It is not "shared with specific people". *Any* signed-in user who has the
  link/id can open it. There is no per-user grant or share token.
- A logged-out visitor cannot open it at all — `canRead` returns `false` with no
  user.

### Not built: saving / following someone else's playlist

Letting user B keep A's playlist in their own account is a separate feature, not
in v1. Two possible shapes:

| Approach        | Behaviour                                                                 |
| --------------- | ------------------------------------------------------------------------ |
| Follow / save   | A row in a new `playlist-follows` join collection (user ↔ playlist). Shows in B's "Saved" list. A still owns it; A's edits show up for B. |
| Clone / copy    | A server action makes a brand-new playlist owned by B with the tracks copied. Independent afterwards — A's later edits do not propagate. |

## The values live in one place

`src/collections/constants/playlists.ts`:

- `PLAYLIST_VISIBILITY` — the raw list `["private", "public", "unlisted"]`.
- `TPLAYLIST_VISIBILITY` — the union type `"private" | "public" | "unlisted"`,
  for typing variables in app code.
- `PLAYLIST_VISIBILITY_OPTIONS` — the `{ label, value }[]` the select field uses.

Import from here (not from the collection config) when app code needs to filter
or label by visibility.
