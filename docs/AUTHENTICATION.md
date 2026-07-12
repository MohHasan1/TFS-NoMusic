# Authentication architecture

NoMusic uses two authentication layers for private pages. The design keeps navigation fast while still checking the authoritative Payload session during rendering.

## Protection flow

```text
Private-page request
  -> Proxy verifies the Payload JWT locally
     -> missing, invalid, or expired: redirect to /signin
     -> valid: allow the page request immediately
  -> Private navbar renders through Suspense
     -> PrivateUserMenuServer asks Payload to authenticate the request
        -> valid database session and user role: render the user menu
        -> missing, revoked, or unauthorized session: redirect to /signin
```

## Layer 1: fast Proxy gate

`src/proxy.ts` protects the private route families listed in `docs/PROXY_AUTH.md`.

It reads the `payload-token` cookie and verifies the JWT locally with `jose`. Verification checks:

- The signature using Payload's processed secret.
- The `HS256` signing algorithm.
- The expiration time.
- That the token belongs to the `users` collection.

This check does not query Payload or the database. Missing, invalid, and expired tokens are redirected to `/signin`; invalid cookies are also cleared.

## Layer 2: authoritative Payload check

Every private layout renders `PrivateUserMenuServer` inside the navbar's Suspense boundary. The component calls `getCurrentUser()`, which uses `payload.auth({ headers })` and requires the authenticated account to have the `user` role.

This database-backed check can reject cases that local JWT verification cannot detect, including:

- A session revoked after the JWT was issued.
- A deleted or disabled account.
- Logout from another device when all sessions are cleared.
- A user whose current role is no longer allowed.

If this check fails, the server component redirects to `/signin`.

## Why this approach was chosen

Performing `payload.auth()` in Proxy for every request would add a database-backed authentication request before each protected page could begin rendering. That would slow navigation, refreshes, cached pages, and partially prerendered pages.

The local JWT gate blocks the common unauthenticated cases early without that database round trip. Meanwhile, the user menu performs the full session check as streamed navbar content, so the rest of the page can begin rendering sooner.

This is especially useful for pages whose content is shared between users and can be cached, such as library pages. Authentication does not need to make that shared content user-specific.

## Trade-offs

### Benefits

- Private navigation is not blocked by a database lookup in Proxy.
- Missing, malformed, tampered, and expired tokens are rejected early.
- Shared cached or partially prerendered content can start rendering quickly.
- Payload still validates the authoritative session during private navbar rendering.

### Costs

- A locally valid JWT may briefly pass Proxy after its server-side session has been revoked.
- Page content may start streaming before `PrivateUserMenuServer` finishes and redirects.
- This can cause a short flash of the private page or navbar fallback for a revoked session.
- Authentication is performed in two places, so their responsibilities must remain clearly separated.

The flash is an intentional performance trade-off. Moving the full Payload check into Proxy or the top of the private layout would prevent it, but every private request would wait for the authoritative session lookup.

## Security boundary

Proxy and `PrivateUserMenuServer` are navigation and rendering guards. They are not a replacement for authorization at the data boundary.

Sensitive Server Actions, route handlers, Payload collection access, and database operations must independently authenticate the request and enforce the required role or ownership rules. Cached shared content must not contain user-specific or confidential data.

In practical terms:

- Use Proxy to decide whether a private page request may begin.
- Use Payload authentication to validate the current session when rendering account-specific UI.
- Use access control at every sensitive read or mutation, even when the route is already protected.

## Redirect behavior

When Proxy sends an unauthenticated visitor to sign-in, it preserves the requested internal path in the `redirect` query parameter. The sign-in Server Action accepts only safe internal paths, rejecting external, protocol-relative, and sign-in-loop destinations.

For detailed route matching, token handling, preferred-language behavior, and redirect rules, see `docs/PROXY_AUTH.md`.
