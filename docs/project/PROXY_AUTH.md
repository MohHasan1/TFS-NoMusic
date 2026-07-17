# Proxy authentication behavior

The application uses `src/proxy.ts` as a lightweight navigation gate for private pages. Its purpose is to block unauthenticated page requests early without performing a database-backed session lookup during normal navigation.

## Matched routes

Proxy runs for:

- `/signin`
- `/nomusic` and nested paths
- `/libraries` and nested library pages
- `/profile` and nested paths
- `/request-nomusic` and nested paths

The private route list is derived from the string values in `PRIVATE_ROUTES`. Dynamic route builders are excluded, but their pages remain protected by their parent route. For example, `/libraries/:id` is covered by `/libraries`.

## Request flow

### No token

- A private-page request redirects to `/signin`.
- The original pathname and query string are saved in the `redirect` query parameter.
- A public request continues normally.

Example:

```text
/libraries
  → /signin?redirect=%2Flibraries
```

After successful sign-in, the sign-in Server Action validates this path and redirects the user back to `/libraries`.

### Invalid or expired token

Proxy verifies the `payload-token` locally using Payload's processed secret and the `HS256` algorithm.

- On `/signin`, the invalid cookie is deleted and the sign-in page is allowed.
- On a private page, the cookie is deleted and the user is redirected to sign-in.
- Other matched requests continue normally.

Local verification checks the JWT signature and expiration without querying the database.

### Valid token

For ordinary private navigation, Proxy immediately allows the request. This avoids calling `/api/users/me` on every page visit.

The token must:

- Have a valid signature.
- Be unexpired.
- Belong to the `users` collection.

### Revoked database session

The private navbar performs the authoritative Payload session check. If that check fails, `PrivateUserMenuServer` redirects to `/signin?sessionExpired=1`.

Proxy then removes the `sessionExpired` parameter, clears the stale `payload-token` cookie, and redirects to the clean `/signin` URL. This breaks the redirect loop that would otherwise occur when a locally valid JWT refers to a deleted or revoked database session, without adding another database request in Proxy.

## Preferred audio language

`prefAudioLang` is stored in the user JWT with `saveToJWT: true`.

Proxy reads this value directly from the verified token. An API request to `/api/users/me` is used only as a migration fallback for older valid tokens that do not contain `prefAudioLang`.

The preferred language is used in two cases, both redirecting to the
per-language route (`PRIVATE_ROUTES.NOMUSIC_LANGUAGE`) rather than a query
parameter — `/nomusic/{value}` instead of `/nomusic?language={value}`, since
NoMusic language filtering is routed, not query-string-driven (see
[NOMUSIC.md](./NOMUSIC.md)):

1. An authenticated user visits `/signin` and is redirected to
   `/nomusic/{value}` (or plain `/nomusic` if no preference is set).
2. `/nomusic?setPrefAudioLang=1` (used when returning from offline mode, see
   `OfflineOnlineDialog`) removes the temporary flag and redirects to
   `/nomusic/{value}`.

The sign-in Server Action (`signinAction`) does the same thing after a
fresh credential-based sign-in, independent of Proxy.

## Full session validation

Local JWT verification does not confirm that the Payload database session still exists. It cannot immediately detect a revoked session, deleted user, disabled account, or logout from another device while the JWT remains valid.

The private navbar performs Payload's full authentication check while rendering `PrivateUserMenuServer`. If that authoritative check fails, it redirects to sign-in. Sensitive API and database operations must also continue to enforce Payload access control.

This two-layer design is intentional:

- Proxy provides fast page navigation, refresh handling, and expiration checks.
- The streamed navbar performs full database-backed session validation.
- Cached and partially prerendered page content can render without waiting for a database lookup.

## Redirect safety

The sign-in Server Action accepts only internal redirect paths:

- The value must begin with `/`.
- Protocol-relative paths beginning with `//` are rejected.
- Redirects back to `/signin` are rejected.

This prevents the `redirect` query parameter from becoming an open redirect to another domain.
