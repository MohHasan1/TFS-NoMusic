# NoMusic card click handling — delegation vs per-card handlers

`NoMusicBrowser.tsx` currently handles track-card clicks via manual event delegation on the outer grid:

```tsx
<div onClick={handleCardClick} className="w-full grid ...">
  {tracks.map((track, index) => (
    <NoMusicCard key={track?.id || index} index={index} noMusic={track} />
  ))}
</div>
```

`handleCardClick` walks up from `event.target` via `closest("[data-nomusic-index]")` to find which card was clicked, reads the index back off the DOM attribute, and looks the track up in the `tracks` array.

## Known issue: accessibility lint

Biome flags this (`lint/a11y/noStaticElementInteractions`, `lint/a11y/useKeyWithClickEvents`): a plain `<div>` isn't semantically interactive, so it has no keyboard equivalent and isn't announced as clickable to assistive tech.

In practice this is less bad than it looks, because each `NoMusicCard` already renders as a proper accessible control — `NoMusicCard.tsx` uses shadcn's `Button` (Base UI's `Button` primitive with `render={<div />}`, `nativeButton={false}`), which gives it real button semantics (keyboard-triggerable, correct role) despite the DOM tag being a `<div>`. The lint warning is specifically about the *outer* wrapper div owning the actual click behavior instead of those already-accessible buttons.

## The fix (not yet applied)

Move the click handler onto each `NoMusicCard`'s own `Button` via an `onSelect(track)` prop, and delete the delegation entirely:

- `NoMusicCard.tsx`: add `onSelect: (track: TNoMusic) => void`, wire it to the `Button`'s own `onClick`.
- `NoMusicBrowser.tsx`: drop `onClick={handleCardClick}` and the `closest()` walk; pass `onSelect={(track) => start(tracks, track)}` to each card.

This also fixes a real (if minor) UX gap: keyboard-triggered activation of a Base UI non-native button doesn't reliably bubble as a DOM click the delegated handler can catch the same way a mouse click does, so keyboard users may not be able to actually play a track today.

## Why "N handlers instead of 1" is not actually less efficient in React

This fix was initially pushed back on as "inefficient" — moving from one delegated listener to ~55+ per-card `onClick`s. That intuition comes from plain DOM work, where `addEventListener` on N elements really does create N native listeners, so delegating to one parent is a genuine win.

**React doesn't work that way.** Since React 17, every `onClick` declared in JSX — no matter how many elements have one — is funneled through a single listener React attaches once, at the root of the app (not `document`, and not per-element). Writing `onClick` on every card doesn't create dozens of native DOM listeners; React already delegates internally regardless of whether the JSX puts the handler on one wrapper or on every leaf element.

The one real cost: passing an inline arrow (`onClick={() => onSelect(track)}`) allocates a new function per render of that card. `NoMusicCard` is already wrapped in `memo`, so it only re-renders when its own props (`index`/`noMusic`/`onSelect`) actually change — not on every scroll or parent re-render — so this cost is negligible in practice, not "N allocations forever."

## Status

Left as-is for now (known debt, not blocking) — the manual delegation pattern still works correctly for mouse users. Revisit if keyboard accessibility for track cards becomes a priority.
