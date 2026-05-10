export const SIGNIN_CONST = {
  FORM_ID: "sign-in-form",
} as const;

export const SIGNIN_CLIENT = {
  FORM_TITLE: "Sign in",
  FORM_DESC: "Continue your private listening session.",

  EMAIL_LBL: "Email",
  PASS_LBL: "Password",

  FALLBACK_ERROR: "Something went wrong. Please try again.",
  FALLBACK_SERVER_ERROR: "Server error. Please try again later.",
  FALLBACK_WRONG_CREDENTIALS: "Invalid credentials. Please try again.",

  SUCCESS_ALERT_TITLE: "Signed in successfully",
  ERROR_ALERT_TITLE: "Failed to sign in",

  SUBMIT_LBL: "Sign In",
  SUBMIT_PENDING_LBL: "Signing in...",

  CTA_LBL: "New here?",
  CTA_LINK_LBL: "Request Access",
  CTA_HREF: "/request-access",
} as const;
