# ISR vs. Cache Components

Why you can't just "add ISR" to a page in this app, what `generateStaticParams`
actually does vs. `dynamicParams`/`revalidate`, and what your real options are
for "generate once, reuse for everyone" — using `/libraries/[id]` as the
running example.

## TL;DR

- This app has `cacheComponents: true` in [next.config.ts](../../next.config.ts).
- That flag **disables** classic ISR's `dynamicParams` and `revalidate` route
  segment config — they simply don't work anymore, on-demand-and-persist
  behavior included.
- `generateStaticParams` is **not** affected — it still works exactly the
  same, in both models.
- The Cache-Components-native replacement for "how does cached content stay
  fresh" is `"use cache"` + `cacheLife` + `cacheTag` — see
  [CACHING.md](../project/CACHING.md).
- There is no built-in "generate on first visit, then reuse from every
  instance forever" behavior in this model without either (a) listing the
  value in `generateStaticParams` ahead of time, or (b) configuring a shared
  external cache store via `cacheHandlers`. Nothing free replaces it.

## The four things that get mixed up

### `generateStaticParams`

A function that tells Next.js **which values of a dynamic segment to
prerender at build time**. Whatever it returns becomes part of the static
build artifact — instant on every request, every instance, every region,
with no runtime cache involved at all.

This function is unaffected by Cache Components. It's used the same way in
both models — see it in action in
[`nomusic/[language]/page.tsx`](../../src/app/(client)/(private)/nomusic/[language]/page.tsx)
(returns all 5 known languages) and
[`libraries/[id]/page.tsx`](<../src/app/(client)/(private)/libraries/[id]/page.tsx>)
(currently returns a small set — see "The `/libraries/[id]` example" below).

Docs: [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)

### Classic ISR — `revalidate` and `dynamicParams`

The *previous* model's two levers:

- `export const revalidate = N` — an already-static page silently regenerates
  in the background after `N` seconds, stale-while-revalidate style.
- `export const dynamicParams = true | false` — controls what happens when a
  dynamic segment is visited that **wasn't** in `generateStaticParams`:
  `true` (default) generates it on demand and effectively adds it to the
  cache; `false` returns a 404.

`dynamicParams = true` is specifically the "visit once, cached forever
after" behavior people expect from ISR. It's the one that's gone.

Docs: [ISR guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration) · [`dynamicParams` reference](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams)

### Cache Components — `cacheComponents: true`

A single `next.config.ts` flag (this app has it on) that turns on `"use
cache"`, `cacheLife`, and `cacheTag`, and — per its own version history —
*"controls the `ppr`, `useCache`, and `dynamicIO` flags as a single, unified
configuration."* It's an all-or-nothing switch for the whole app, not
something you can enable per-route.

Docs: [cacheComponents](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)

### `"use cache"` / `cacheLife` / `cacheTag`

The replacement caching model. Mark a component/function `"use cache"`,
set how long it stays fresh with `cacheLife`, tag it with `cacheTag` for
on-demand invalidation via `revalidateTag`. This is what this app actually
uses — see [CACHING.md](../project/CACHING.md) for the full picture (tag naming
convention, what invalidates what, cache lifetimes in use).

Docs: [`use cache`](https://nextjs.org/docs/app/api-reference/directives/use-cache)

## What's actually removed when Cache Components is on

Straight from the route segment config version history:

> "`dynamic`, `dynamicParams`, `revalidate`, and `fetchCache` removed when
> Cache Components is enabled."

And confirmed on the `dynamicParams` page specifically:

> "`dynamicParams` is not available when Cache Components is enabled."

This isn't a deprecation warning — attempting to set it throws at build
time: `"dynamicParams" is not compatible with nextConfig.experimental.cacheComponents. Please remove it.`
([source: GitHub discussion vercel/next.js#84991](https://github.com/vercel/next.js/discussions/84991))

Docs: [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)

## `generateStaticParams` + `"use cache"` = build-time ISR, not dynamic ISR

This combination is exactly what `libraries/[id]/page.tsx` and
`nomusic/[language]/page.tsx` already do, and it's worth being precise about
what it does and doesn't give you.

**What it gives you (build-time ISR):** for every value returned by
`generateStaticParams`, the `"use cache"`-marked component runs once at
`next build`, and its output is baked into the static build artifact —
instant on every request, forever, from any instance, any region. The
`cacheLife` you set (`"max"`, `"weeks"`, etc.) controls when it's due for a
background refresh, and `cacheTag` + `revalidateTag` let you bust it
on-demand. Functionally, this **is** the "build known pages ahead of time,
keep them fresh via revalidation" half of what classic ISR did — just
expressed with `"use cache"`/`cacheLife`/`cacheTag` instead of
`revalidate`.

**What it does *not* give you (dynamic ISR):** for a value **not** in
`generateStaticParams` — `"use cache"` on its own doesn't retroactively
promote it into that same durable, cross-instance-guaranteed tier. The
first visit runs the function fresh and stores the result in whatever cache
handler is configured (in-memory by default — see below), but that's a
*runtime* cache, not a *build* artifact. It doesn't get written back into
the static shell, and without a shared `cacheHandlers` store, an instance
that never handled that request has no way to know the value was ever
computed. This is the exact piece classic ISR's `dynamicParams = true`
provided (generate on demand, then treat it as if it had been static all
along) that has no equivalent under Cache Components.

In short: `generateStaticParams` decides what's eligible for the "instant,
everywhere, forever" tier — `"use cache"` keeps what's in that tier fresh.
Neither one promotes an uncovered value *into* that tier at runtime.

## So how do you get "generate once, reuse for everyone" without ISR?

Two options, no third:

1. **`generateStaticParams`** — list the value ahead of time. Build-time
   only, zero runtime infra, works everywhere immediately. Best for small,
   known, non-sensitive sets of values (a fixed list of languages, a fixed
   list of library types).
2. **`cacheHandlers` + an external store** (Redis, Upstash, Vercel KV, etc.)
   — `"use cache"`'s default handler is in-memory and scoped to a single
   server process/instance:
   > "If you don't configure `cacheHandlers`, Next.js uses an in-memory LRU
   > (Least Recently Used) cache for both `default` and `remote`."
   On serverless, each request can land on a different instance with its own
   separate memory, so nothing is shared unless you plug in a real external
   store. This is the only way to get true cross-instance "generate once,
   reuse everywhere" for values you can't or don't want to list in
   `generateStaticParams`.

   Docs: [`cacheHandlers`](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheHandlers)

Neither option is "free" the way people remember classic ISR being — and
per the *current* ISR guide, even classic ISR isn't free of this on
multi-instance deployments without a shared handler:

> "When running multiple instances, the default file-system cache is
> per-instance... Use a shared custom cache handler to coordinate across
> instances."

## The `/libraries/[id]` example

`generateStaticParams` here currently only returns a small handful of
library ids. Any library id **not** in that list was never part of the
static build, so on a serverless deployment, visiting it:

- Always renders on demand (no static shell exists for it).
- May or may not hit a warm `"use cache"` entry depending on which instance
  the request lands on — with no custom `cacheHandlers` configured, there's
  no guarantee two requests (even seconds apart) hit the same instance.

That's why some library pages load instantly (covered by
`generateStaticParams`) while others show the loading skeleton on every
visit, even repeat ones — there's no persistent, shared cache backing them.

**The fix, if it's the language libraries specifically:** expand
`generateStaticParams` to return all `type: "language"` libraries (a small,
fixed, shared/curated set of 5 — same pattern as
`/nomusic/[language]`) rather than just one. `"album"` and `"user"` type
libraries are a separate call — `"user"` libraries in particular are
personal/private, and baking them into the public static build would
publish that content without requiring login, which is a privacy tradeoff,
not just a caching one.

## Notes

### Gotcha: `next/root-params` is a different, undocumented, separate thing

A GitHub discussion ([vercel/next.js#84991](https://github.com/vercel/next.js/discussions/84991))
mentions `next/root-params` combined with partial `generateStaticParams`
possibly giving ISR-like behavior for **root-level** dynamic segments
specifically (e.g. `[locale]` sitting right below the root layout). Worth
knowing this exists, but:

- The people discussing it call it *"still undocumented"* — it's not in the
  official Next.js docs.
- It only applies to root params, not a nested segment like
  `libraries/[id]` (which sits several route groups deep).
- The same thread confirms it doesn't work inside a `"use cache"` scope yet
  — you'd still have to resolve it outside and pass it in as a prop, which
  is already the pattern this app uses (see the `params` Promise gotcha in
  [CACHING.md](../project/CACHING.md#notes)).

Don't build on this without re-checking whether it's been documented/
stabilized since.

## Sources

- [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [ISR guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration)
- [`dynamicParams` reference](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams)
- [Route Segment Config (version history)](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
- [`cacheComponents`](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)
- [`use cache`](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [`cacheHandlers`](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheHandlers)
- [GitHub discussion: dynamicParams = false for Cache Components](https://github.com/vercel/next.js/discussions/84991)
- Local copies of the first seven: `node_modules/next/dist/docs/01-app/...`
  (same content, may lag behind the live site by a version or two)
