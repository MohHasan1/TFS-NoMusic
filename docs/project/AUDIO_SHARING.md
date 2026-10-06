# Audio Sharing

## Current flow

NoMusic exposes public track previews at `/share/audio/[id]`. The private NoMusic card share menu can open the device share sheet or copy the public URL.

The public page supplies track-specific title, description, Open Graph, and Twitter metadata. Social platforms fetch this metadata independently, so previews may be cached by each platform.

## Future Instagram Story sharing

Instagram does not provide a normal web API that allows a PWA to publish a Story with a clickable link or automatically add a Link Sticker. The practical PWA flow is therefore:

1. Generate a Story-sized PNG for the selected track.
2. Include the cover, track name, artist, NoMusic branding, and a QR code linked to `/share/audio/[id]`.
3. Share the PNG through the native Web Share API when file sharing is supported.
4. Fall back to downloading the PNG when file sharing is unavailable.
5. Copy the public URL so the user can manually add it with Instagram's Link Sticker.

Adding the Link Sticker and publishing the Story remain manual actions inside Instagram.

## Proposed implementation

### Image endpoint

Add a public endpoint such as:

```text
/share/audio/[id]/story
```

The endpoint should:

- Fetch the track through the existing public audio-sharing service.
- Return `notFound()` or an appropriate image response when the track is unavailable.
- Generate a `1080 × 1920` PNG with `ImageResponse` from `next/og`.
- Use app theme colours and keep all essential content inside Story-safe margins.
- Generate a QR code for the canonical public share URL.
- Avoid persisting generated images unless performance measurements justify storage.

### Client action

Extend the audio-sharing hook with a dedicated action such as `shareInstagramStory()`:

1. Fetch the Story endpoint.
2. Convert the response to a PNG `Blob` and `File`.
3. Check `navigator.canShare({ files: [file] })` before sharing.
4. Call `navigator.share({ files: [file] })` when supported.
5. Otherwise, trigger a browser download.
6. Copy the public track URL and explain that the user must add it through Instagram's Link Sticker.

The user cancellation case (`AbortError`) should remain silent. Other failures should use the shared app toaster.

### Share menu

Add an **Instagram Story** item to `NoMusicShareButton`. Keep the existing **Share** and **Copy link** actions unchanged.

## Platform notes

- Mobile browser and PWA support for sharing files varies, so feature detection is required.
- Selecting Instagram from the native share sheet is controlled by the operating system and installed apps.
- A PWA cannot guarantee that Instagram opens directly in the Story composer.
- The QR code remains usable even when a clickable Link Sticker is omitted.
- The public page and its cover image must remain accessible without authentication for social crawlers.

## Suggested validation

- Verify the image endpoint with tracks that have and do not have cover artwork.
- Test long track and artist names for overflow.
- Test native file sharing on Android and iOS PWAs.
- Test the download fallback on desktop and unsupported mobile browsers.
- Scan the generated QR code from another device.
- Confirm the public link resolves correctly for signed-out and signed-in users.
