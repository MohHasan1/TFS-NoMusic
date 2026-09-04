const PUBLIC_ROUTES = {
  HOME: "/",

  SIGNIN: "/signin",
  LOGOUT: "/signin?sessionExpired=1",
  SIGNUP: "/signup",

  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  REQUEST_ACCESS: "/request-access",
  CHECK_EMAIL: "/check-email",

  API_HEALTH: "/api/health",
} as const;

const PRIVATE_ROUTES = {
  NOMUSIC: "/nomusic",
  NOMUSIC_LANGUAGE: (language: string) => `/nomusic/${language}`,
  LIBRARY: (id: string) => `/libraries/${id}`,
  LIBRARIES: "/libraries",
  PLAYLISTS: "/playlists",
  PLAYLIST: (id: string) => `/playlists/${id}`,
  PROFILE: "/profile",
  REQUEST_NOMUSIC: "/request-nomusic",
} as const;

const OFFLINE_ROUTES = {
  HOME: "/offline",
  NOMUSIC: "/offline?view=nomusic",
  LIBRARIES: "/offline?view=libraries",
  LIBRARY: (id: string) => `/offline?view=library&id=${encodeURIComponent(id)}`,
  STORAGE: "/offline?view=storage",
  TEST: "/offline/test",
} as const;

export { OFFLINE_ROUTES, PUBLIC_ROUTES, PRIVATE_ROUTES };
