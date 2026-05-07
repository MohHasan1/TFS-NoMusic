# NoMusic

Private music app built with Next.js, Payload CMS, and React.

## Stack

- Next.js 16
- Payload CMS 3
- React 19
- Tailwind CSS 4
- Zustand

## Features

- Public auth flow for signup and login
- Private `NoMusic` collection browsing and playback
- Payload admin for managing collections
- Media storage through the configured storage plugin

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Set required env vars in `.env`.

At minimum:

```env
PAYLOAD_SECRET="your-secret"
SERVER_URL="http://localhost:3000"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

Keep `SERVER_URL` aligned with the exact local origin you use in dev.

3. Start the app:

```bash
pnpm run dev
```

4. Open:

```txt
http://localhost:3000
http://localhost:3000/admin
```

## Scripts

```bash
pnpm run dev
pnpm run build
pnpm run start
pnpm run payload:types
pnpm run payload:importmap
pnpm run lint
pnpm run format
```

## Notes

- Payload admin auth uses the `admins` collection.
- App user auth uses the `users` collection.
- If auth behaves inconsistently in local dev, make sure your browser origin matches `SERVER_URL`.
