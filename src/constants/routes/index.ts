const PUBLIC_ROUTES = {
  HOME: "/",

  SIGNIN: "/signin",
  SIGNUP: "/signup",

  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  REQUEST_ACCESS: "/request-access",
  CHECK_EMAIL: "/check-email",
} as const;

const PRIVATE_ROUTES = {
  NOMUSIC: "/nomusic",
  LIBRARY: (id: string) => `/libraries/${id}`,
  LIBRARIES: "/libraries",
  REQUEST_NOMUSIC: "/request-nomusic",
} as const;

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
