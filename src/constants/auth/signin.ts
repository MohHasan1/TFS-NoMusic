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
  VALIDATION_PASS_ERROR: "Looks like your password missed its cue.",

  FALLBACK_ERROR: "Something went a little off-script, try again?",
  FALLBACK_SERVER_ERROR: "Our servers are taking a short intermission, please try again soon.",
  FALLBACK_WRONG_CREDENTIALS: "That didn't quite hit the right note, give it another try.",

  SUCCESS_ALERT_TITLE: "You're in!",
  ERROR_ALERT_TITLE: "Not quite in tune yet",

  SUBMIT_LBL: "Sign in",
  SUBMIT_PENDING_LBL: "Tuning things up...",

  CTA_LBL: "Not in yet?",
  CTA_LINK_LBL: "Knock to enter",
  CTA_HREF: PUBLIC_ROUTES.REQUEST_ACCESS,
} as const;
