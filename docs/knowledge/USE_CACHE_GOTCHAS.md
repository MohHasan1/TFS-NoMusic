# `"use cache"` Gotchas

General Next.js/Cache Components pitfalls worth knowing before writing a
`"use cache"` function — not tied to any specific tag or component in this
project. For this project's actual cache tags, revalidation hooks, and
project-specific incidents, see [CACHING.md](../project/CACHING.md).

## `connection()` and `"use cache"` are opposites — never combine them

`connection()`'s whole job is to force a component out of prerendering/
caching and make it run fresh against a real request every time:

> "The `connection()` function allows you to indicate rendering should wait
> for an incoming user request before continuing... you want it to be
> rendered at runtime and **not prerendered at build time**."
>
> — [`connection()` reference](https://nextjs.org/docs/app/api-reference/functions/connection)

`"use cache"`'s whole job is the opposite: compute once, store the result,
reuse it for future requests instead of re-running. Calling `connection()`
inside a `"use cache"`-marked function asks Next to do both at once for the
same code — contradictory, not just redundant.

The main caching guide presents them as two **alternative** answers to the
same problem (a value that's random/time-based/otherwise non-deterministic),
not something to combine:

```tsx
// Option A: force it dynamic — fresh every request
async function UniqueContent() {
  await connection()
  const uuid = crypto.randomUUID()
  return <p>Request ID: {uuid}</p>
}

// Option B: cache it — same value for everyone until revalidation
export default async function Page() {
  'use cache'
  const buildId = crypto.randomUUID()
  return <p>Build ID: {buildId}</p>
}
```

Pick one per function. If you need to make an existing `connection()`-based
component cacheable, remove the `connection()` call and add
`"use cache"` + `cacheLife`/`cacheTag` instead — that's the swap made in
`noMusicContentSection.tsx` (see [CACHING.md](../project/CACHING.md)).

Docs: [`connection()`](https://nextjs.org/docs/app/api-reference/functions/connection) · [Working with non-deterministic operations](https://nextjs.org/docs/app/getting-started/caching#working-with-non-deterministic-operations)

Local copies: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/connection.md` and `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`
