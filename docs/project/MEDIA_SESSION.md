# Lock Screen / Notification Playback Controls

File: `src/features/playback/hooks/useTrackSession.ts`

This hook connects `nomusic`'s player to the phone's lock screen and
notification media controls, using the browser's **Media Session API**
(`navigator.mediaSession`).

## Explain it like I'm confused (no jargon)

**Two `useEffect`s, why?**

One `useEffect` sets up the lock-screen buttons (play, pause, skip,
rewind, etc). This only needs to happen once per song.

The other `useEffect` tells the phone "here's what second of the song
we're on." This needs to happen constantly — every second or so — while
the song plays.

If both lived in the *same* `useEffect`, updating the time would also
destroy and rebuild all the buttons, because in React, changing a value
listed in an effect's dependency array (`[...]` at the end) makes React
throw the whole effect away and run it fresh. That value list used to
include `currentTime`, which changes every second — so it was
destroying and recreating all 8 buttons every second, just to update one
number. Splitting it into two effects means only the tiny time-update
effect reruns that often; the buttons are left alone.

**Why a `ref` for the rewind/fast-forward buttons?**

The rewind button is created once (inside the buttons effect) and needs
to answer "what time is it right now?" whenever it's actually tapped —
which could be seconds or minutes after it was created.

A normal variable would freeze at whatever value it had *when the button
was created* — like a photo, stuck in time forever. A `ref` is different:
it's like a sticky note that's constantly updated with the latest time,
which the button can peek at whenever it's tapped, instead of relying on
a frozen memory. Updating the sticky note doesn't rebuild anything — it's
just writing a new number down.

**Does the component still re-render every second?**

Yes — that part doesn't change, and can't really be avoided, since the
time value itself needs to update every second somewhere. But this
component (`PlaybackInitializer`) renders nothing visible (it returns
`null`), so "re-render" here just means a small invisible function runs
again — no flicker, no visible cost. What we removed was the *expensive
extra work* that used to happen alongside that re-render (rebuilding all
8 buttons) — not the re-render itself.

## The bug this fixes

**Symptom:** On mobile, pause the track from the notification, then press
play again from the notification. Playback *looks* like it's working (the
seek bar moves), but no sound comes out — until you reopen the app.

**Cause:** The hook used to only register handlers for `nexttrack`,
`previoustrack`, and `seekto`. It never registered `play`/`pause` handlers.

Without an explicit handler, the browser falls back to its own default
behavior: it calls `.play()`/`.pause()` directly on the raw `<audio>`
element, bypassing all of `nomusic`'s own playback code. On Android, that
default path doesn't reliably reclaim the phone's audio output after the
app has been backgrounded for a while — so the audio element reports
"playing" (time keeps advancing) but nothing is actually audible.

**Fix:** Register explicit `play`/`pause` handlers that call into
`nomusic`'s own player functions (`resumeTrack()` / `pauseTrack()`) —
the same functions the in-app play/pause button uses — instead of letting
the browser touch the audio element directly.

## What's registered

| Action | What it does | Triggered by |
|---|---|---|
| `play` | Resumes playback | Notification/lock-screen play button |
| `pause` | Pauses playback | Notification/lock-screen pause button |
| `stop` | Fully stops and clears the player/queue | Rare — some devices/car systems have a separate stop control |
| `nexttrack` | Skips to the next track | Notification/lock-screen skip-forward button |
| `previoustrack` | Skips to the previous track | Notification/lock-screen skip-back button |
| `seekto` | Jumps to an exact position | Dragging the lock-screen scrubber |
| `seekbackward` | Skips back a few seconds (default: 4s) | Rewind button (double-tap gestures, earbuds, car controls) |
| `seekforward` | Skips ahead a few seconds (default: 4s) | Fast-forward button |

All of these call into `nomusic`'s own hooks (`usePlayerActions`,
`usePlayerSeek`, `useTrackNavigation`) — never the audio engine directly.
This keeps notification controls in sync with the in-app UI, since both
go through the same code path.

## Position reporting (`setPositionState`)

Separately, the hook also tells the OS the track's real duration and
current position, so the lock-screen scrubber shows accurate progress
instead of the browser's own guess:

```ts
navigator.mediaSession.setPositionState({
  duration,
  playbackRate: 1,
  position: currentTime,
});
```

This is optional polish, not required for play/pause/skip to work — it
only affects whether the lock-screen progress bar is accurate.

## Playback state reporting (`playbackState`)

Also set alongside `setPositionState`, in the same effect:

```ts
navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
```

This explicitly tells the OS whether to show a play or pause icon on the
notification, using `isPlaying` read directly from the store
(`store.use.isPlaying()`) — the same pattern already used for `track` in
this file. Without this, the browser infers it automatically from the
real `<audio>` element's native play/pause events, which already works
fine — this just makes it explicit instead of inferred.

## Why two separate `useEffect`s

- **Effect 1** — sets the track metadata (title/artist/artwork) and
  registers all 8 action handlers. Runs once per track.
- **Effect 2** — calls `setPositionState` and sets `playbackState`. Runs
  on every playback tick (roughly every 250ms-1s), since position needs
  to stay fresh.

They're split so the metadata/handlers aren't torn down and rebuilt
several times a second — only the small position update runs that often.

`seekbackward`/`seekforward` still need the *latest* `currentTime` even
though they're registered once per track. That's done with a `ref`
(`liveRef`) that's updated on every render but doesn't cause the
handlers to be recreated — the handler function stays the same, it just
reads `liveRef.current` at call time to get whatever value is freshest.

## Why a `ref` and not just reading `currentTime` directly

A normal variable captured inside a `useEffect` gets frozen at whatever
value it had when the effect last ran (a "closure"). If the
`seekbackward` handler was created when `currentTime` was `12`, it would
always rewind from `12` — even minutes later — unless the effect re-ran
to recreate the handler with a new frozen value.

That's exactly the tradeoff we wanted to avoid: re-running the effect on
every tick just to keep one number fresh meant rebuilding metadata and
re-registering all 8 handlers several times a second, for no real reason.

A `ref` sidesteps this because of one property: **writing to
`ref.current` never causes a re-render or an effect re-run, and reading
`ref.current` inside a function always returns whatever was written most
recently** — not what it was when the function was created.

```ts
const liveRef = useRef({ currentTime, duration });
liveRef.current = { currentTime, duration }; // updated on every render
```

So the plan becomes:
- `liveRef.current` is kept fresh every render (cheap — no effect, no
  re-render triggered by writing to it).
- The `seekbackward`/`seekforward` handlers are created once, inside the
  effect that only runs per-track, and close over `liveRef` (the box
  itself, not its contents).
- When the OS actually calls the handler — maybe seconds or minutes
  later — it reads `liveRef.current.currentTime` at that exact moment,
  getting the real up-to-date value instead of a stale one.

In short: the *handler* stays stable (registered once per track), but
the *data it reads* stays live. That's the whole trick.
