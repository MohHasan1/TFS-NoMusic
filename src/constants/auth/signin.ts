import { PUBLIC_ROUTES } from "#constants/routes";

export const SIGNIN_CONST = {
  FORM_ID: "sign-in-form",
} as const;

export const SIGNIN_CLIENT = {
  FORM_TITLE: "Welcome back 🎧",
  FORM_DESC: "Let's get you back to the voices you love.",

  EMAIL_LBL: "Email address",
  EMAIL_PLACEHOLDER: "Pop in your email",
  VALIDATION_EMAIL_ERROR: "Hmm… that email sounds a bit off-key",

  PASS_LBL: "Password",
  PASS_PLACEHOLDER: "Your quiet little secret",
  VALIDATION_PASS_REQUIRED: "Looks like your password missed its cue.",

  ERROR_ALERT_TITLE: "Sign in did not work:",
  WRONG_CREDENTIALS_MSG: "Hmm... that email or password does not look right.",

  FALLBACK_ERROR: "Something unexpected happened. Please try again.",
  FALLBACK_SERVER_ERROR: "The servers are taking a quick break. Please try again soon.",

  SUBMIT_LBL: "Sign in",
  SUBMIT_PENDING_LBL: "Getting you back in...",

  CTA_LBL: "Password gone missing?",
  CTA_LINK_LBL: "Help me get back in",
  CTA_HREF: PUBLIC_ROUTES.FORGOT_PASSWORD,
} as const;
