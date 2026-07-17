/**
 * Central source of truth for `cacheTag`/`revalidateTag` strings. Both sides
 * (the `"use cache"` component setting the tag, and the collection hook
 * revalidating it) must produce the exact same string — import from here
 * instead of hand-writing template strings so they can't drift apart.
 *
 * See docs/CACHING.md for the tag naming convention and what invalidates what.
 */
export const CACHE_TAG = {
  LIBRARY: {
    DETAIL: (id: string | number) => `library:${id}`,
    AUDIO: (id: string | number) => `library-audio:${id}`,
    LIST: (type: string) => `libraries:${type}`,
  },
  NOMUSIC: {
    LIST: (language: string) => `nomusic:${language}`,
    ALL: "nomusic:all",
  },
} as const;
