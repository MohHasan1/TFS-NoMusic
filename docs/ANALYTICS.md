# Analytics

NoMusic uses [PostHog](https://posthog.com) for product analytics. Client-side instrumentation lives in the `#analytics` feature slice (`src/features/analytics/`) and is initialized once in `src/instrumentation-client.ts`.

`instrumentation-client.ts` skips calling `initAnalytics()` entirely when `window.location.pathname` starts with `/admin` (the Payload admin panel) — PostHog never loads there, so admin usage is never tracked. This check lives at the call site, not inside `initAnalytics()`, since knowing about Payload's admin route is app-routing knowledge, not something the generic analytics init should hardcode.

`#analytics` is a leaf feature: it has no knowledge of playback, libraries, or offline internals. Other features depend on it; it never depends on them.

## Init

`initAnalytics()` (`src/features/analytics/lib/init.ts`) configures PostHog:

- `autocapture: { css_selector_allowlist: ["[data-ph-capture-attribute-action]"] }` — captures clicks, but **only** on elements matching this selector (or with a tagged ancestor). Untagged buttons/links across the app are never captured. See [Autocapture + capture attributes](#autocapture--capture-attributes) below.
- `capture_pageview: "history_change"` and `capture_pageleave: true` — page views and leaves are tracked automatically; no manual instrumentation needed for navigation.
- `disable_session_recording: true` — no session replay.
- `person_profiles: "identified_only"` — anonymous visitors don't create a PostHog person profile until identified.
- `opt_out_capturing_by_default: isDevEnv()` (`#lib/env`) — in development, opts out before any capturing starts (including the very first pageview). The SDK still fully initializes (so `identify()`/`track()`/`resetIdentity()` stay safe no-ops everywhere they're called), but nothing is sent to PostHog while running locally.

## Identify and reset

- `useIdentifyUser({ userId, userEmail, userName })` (`hooks/useIdentifyUser.ts`) calls `posthog.identify()` in an effect. Wired into `PrivateUserMenu`, which renders on every private page and already has the signed-in user's data.
- `useResetIdentity()` (`hooks/useResetIdentity.ts`) returns `resetIdentity()`, which calls `posthog.reset()`. Wired into both logout flows (`LogoutMenuDialog`, `LogoutDialog`), called alongside playback/offline cleanup before the logout server action runs.

> **Why reset on logout:** without it, a second person on a shared device would inherit the first person's identified PostHog profile until they're identified themselves.

## Two tracking mechanisms

Two different needs, two different mechanisms. Don't cross them.

### Autocapture + capture attributes

**Use for:** discrete UI interactions — "the user pressed this thing." Low effort, no engine plumbing, good for browsing/navigation-shaped actions.

PostHog's autocapture reports clicks on interactive elements automatically. `data-ph-capture-attribute-*` attributes on an element are attached as properties on that element's autocaptured event. This repo's naming convention:

- `action` values are `snake_case`, never contain spaces or the word "nomusic" (use `audio` instead — e.g. `library_audio_pressed`), and end in `_pressed` when the interaction is a plain press/click with no more specific outcome (a more specific past-tense verb like `downloaded`, `removed`, `confirmed`, `cancelled`, or `selected` for choosing an option from a dropdown/select is used instead when one applies).
- Elements that live in the offline app (`src/features/offline/...`, or are otherwise offline-only) get `_offline` appended to `action`, so an event's origin is never ambiguous — even when the online and offline versions of a component are otherwise tracking the "same" interaction.

```tsx
<button
  data-ph-capture-attribute-action="audio_pressed"
  data-ph-capture-attribute-audio-id={noMusic.id}
>
  ...
</button>
```

Tagged elements. **Attributes** lists every `data-ph-capture-attribute-*` key beyond `action`:

| Action | Element | File | Attributes |
| --- | --- | --- | --- |
| `audio_pressed` | track card | `NoMusicCard.tsx` | `audio-id`, `audio-name` |
| `audio_pressed_offline` | track card | `OfflineNoMusicCard.tsx` | `audio-id`, `audio-name` |
| `library_pressed` | library card | `LibCard.tsx` | `library-name` (no `id` prop available here today — see note) |
| `library_pressed_offline` | library card | `OfflineLibCard.tsx` | `library-id`, `library-name` |
| `library_audio_pressed` | track row inside a library | `LibraryTrackRow.tsx` | `audio-id`, `audio-name` (no `library-id` here today — see note) |
| `library_audio_pressed_offline` | track row inside a library | `OfflineLibraryTrackRow.tsx` | `audio-id`, `audio-name` (no `library-id` here today — see note) |
| `audio_downloaded` | download button | `NoMusicDownloadButton.tsx` | `audio-id`, `audio-name` |
| `audio_removed_offline` | remove button | `OfflineNoMusicRemoveButton.tsx` | `audio-id`, `audio-name` |
| `library_downloaded` | library download button | `LibraryDownloadButton.tsx` | `library-id`, `library-name` |
| `library_removed_offline` | library remove button | `OfflineLibraryRemoveButton.tsx` | `library-id`, `library-name` |
| `player_dialog_pressed` | expand arrow on the player bar | `PlayerDialogButton.tsx` | none (no track context available here) |
| `go_online_pressed_offline` | confirm button in the go-online dialog | `OfflineOnlineDialog.tsx` (the `AlertDialogAction`, **not** the `AlertDialogTrigger` — that only opens the confirmation) | none |
| `profile_pressed` | profile menu item | `ProfileMenuButton.tsx` | none |
| `offline_mode_pressed` | offline mode menu item (lives in the private/online menu — pressing it navigates *into* offline mode, so no `_offline` suffix) | `OfflineModeMenuButton.tsx` | none |
| `logout_confirmed` | confirm button in the logout dialog | `LogoutMenuDialog.tsx` (also mirrored in the unused `LogoutDialog.tsx`) | none |
| `logout_cancelled` | cancel button in the logout dialog | `LogoutMenuDialog.tsx` (also mirrored in the unused `LogoutDialog.tsx`) | none |
| `sign_in_pressed` | sign-in form submit button | `SigninFormFooter.tsx` (the `FormSubmitButton`, which spreads extra props onto the underlying `Button`) | none — no email/password captured; PII and credentials are never put in `data-ph-capture-attribute-*` |
| `forgot_password_pressed` | forgot-password form submit button | `ForgotPasswordFormFooter.tsx` (same `FormSubmitButton` pattern) | none — no email captured, same reasoning |
| `signup_pressed` | signup form submit button | `SignupFormFooter.tsx` (same `FormSubmitButton` pattern) | none — no email/password captured, same reasoning |
| `install_pressed` | PWA install button | `PwaInstallButton.tsx` (the real install-prompt trigger; the manual-instructions `InstallHintDialog` shown to iOS/Safari/no-prompt users is not tagged) | none |
| `language_filter_selected` | each option in the NoMusic language filter | `NomusicLanguageFilter.tsx` (the `SelectItem` per option, tagged inside the `.map()` — not the `SelectTrigger`) | `language` (the selected option's value) |
| `brand_logo_pressed` | brand logo/home link | `BrandLogoLink.tsx` (shared by the public header and the private navbar; offline has its own separate inline logo markup in `OfflineNavbar.tsx`, untagged) | `link` (the destination href) |

> **Status: implemented.** `autocapture` is scoped to `[data-ph-capture-attribute-action]` in `init.ts`, and every element above is tagged.

> **Note — missing `library-id`:** `LibCard.tsx` only receives `href`/`name`/`author`/`trackCount`/`imageURL`, not a raw `library.id` (its offline counterpart, `OfflineLibCard.tsx`, gets the full `library` object and does have it). Neither `LibraryTrackRow.tsx` nor `OfflineLibraryTrackRow.tsx` is passed the `libId` its parent already has in scope. Closing these gaps means threading the ID down as a new prop — a small change, tracked here rather than done speculatively.

Deliberately **not** tagged this way:

- Anything continuous (drag, scroll, seek-bar dragging) — autocapture is for discrete clicks, not high-frequency events.
- Play/pause toggle and queue next/previous (`PlayerControls.tsx`) — too high-frequency to be useful as click telemetry; playback truth is better served by the `song_played`/`song_completed` `track()` events instead.

### Typed `track()` events

**Use for:** facts about what actually happened, not what the user clicked — especially playback truth (did the audio actually start, finish, or error), which a click can't tell you (autoplay can fail silently, a "pressed play" click doesn't mean the track loaded).

`track<Event>(event, properties)` (`track.ts`) is a type-safe wrapper over `posthog.capture()`, keyed by the `TAnalyticsEvents` map (`events.ts`):

- `app_opened` — `{ entry_path }`
- `library_opened` — `{ library_id, library_name }`
- `song_played` — `{ song_id, song_name, library_id?, library_name?, audio_language? }`
- `song_completed` — `{ song_id, song_name, library_id?, listened_seconds?, duration_seconds? }`
- `playback_failed` — `{ song_id, song_name, library_id?, error_name? }`

> **Status: scaffolded, not yet called anywhere.** No component or hook calls `track()` yet.

Each event should be fired from the single place that actually knows the fact happened, not from every UI surface that could trigger it:

- `song_played` / `song_completed` / `playback_failed` belong in the playback engine (`features/playback/modules/player`), mounted once (e.g. in `features/playback/initializer`) so they fire once regardless of which bar, dialog, or card triggered playback.
- `library_opened` belongs in the library view, as a mount-effect tracker component (same shape as `OfflineUserPrecache`).
- `app_opened` belongs once in the root layout (or `instrumentation-client.ts`, reading `window.location.pathname` for `entry_path`).

## Adding a new event

- **A UI click, no playback/engine truth needed:** add `data-ph-capture-attribute-action="..."` (plus any other `data-ph-capture-attribute-*` properties) to the element and add a row to the table above. No init changes needed — the `css_selector_allowlist` already matches any element with `data-ph-capture-attribute-action`.
- **A fact only an engine/feature module knows (not a click):** add the event to `TAnalyticsEvents` in `events.ts`, then call `track()` from the one place in that feature that owns the underlying state — not from a button handler.

Either way, keep the owning feature responsible for its own instrumentation. `#analytics` only ever provides `track()`, the event types, and the identify/reset hooks — it should never import from `playback`, `offline`, or any other feature.
